import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Coordinates } from '../core/api/openaq/coordinates.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { Parameter } from '../core/api/openaq/parameter.model';
import { CalculationService } from '../core/calculation/calculation.service';
import { CalculationResponse, CalculationMessage } from '../core/calculation/calculation-response.models';
import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { NamingService } from '../core/naming/naming.service';
import { SearchedCity } from '../search/searched-city.model';
import { MessagingService } from '../shared/messaging/messaging.service';
import { ServiceWorkerHelper } from '../shared/service-worker/service-worker.helper';

import { ParameterAverage } from './individual-aqi.model';
import { LatestCityMeasurements } from './latest-city-measurements.model';

@Injectable()
export class CityService {

    constructor(
        private calculationService: CalculationService,
        private namingService: NamingService,
        private staticMapsHandlerService: StaticMapsHandlerService,
        private latestHandlerService: LatestHandlerService,
        private messagingService: MessagingService
    ) {}

    public getLatestCityMeasurements(searchedCity: SearchedCity): Observable<LatestResponse> {
        return this.latestHandlerService
            .getLatestByCityAndCountry(searchedCity.city, searchedCity.country)
            .pipe(catchError(err => {
                if(ServiceWorkerHelper.isServiceWorkerTimeout(err)) {
                    this.messagingService.warnDismissable(
                        `Currently offline, and no measurements have been saved for ${searchedCity.city.toUpperCase()} - ` +
                        `will be loaded when connection is restored`
                    );
                } else {
                    this.messagingService.errorDismissable(
                        `Failed to retrieve measurement data for ${searchedCity.city.toUpperCase()} from OpenAQ`,
                        [`Search error for ${searchedCity.city}: `, searchedCity, err]
                    );
                }
                return of(null);
            }));
    }

    public getStaticMapsImageFileURL(searchedCity: SearchedCity): Promise<any> {
        const coordinates = this.getLatLong(searchedCity);
        return this.staticMapsHandlerService
            .getImageByLatLong(coordinates.latitude, coordinates.longitude)
            .toPromise()
            .then(res => this.createImageFromBlob(res))
            .catch(err => {
                if(ServiceWorkerHelper.isServiceWorkerTimeout(err)) {
                    console.warn(`Currently offline, and no background been saved for ${searchedCity.city.toUpperCase()} - ` +
                        `will be loaded when connection is restored`)
                } else {
                    console.error(`Failed to retrieve background for ${searchedCity.city.toUpperCase()} ` +
                    `from Google Static Maps`, err);
                }
                return Promise.resolve(null);
            });
    }

    public getParameterAverages(searchedCity: SearchedCity, latestResponse: LatestResponse): ParameterAverage[] {
        const parameterAverages: ParameterAverage[] = [];
        this.verifyCityAndLatest(searchedCity, latestResponse) && this.getAvailableParameters(searchedCity)
            .forEach(parameter => parameterAverages.push(this.getParameterAverage(parameter, latestResponse)));
        return parameterAverages;
    }

    public getOverallAQI(parameterAverages: ParameterAverage[]): number {
        if (!parameterAverages || parameterAverages.length <= 0) return null;
        return parameterAverages.map(average => average.AQI).reduce((a, b) => Math.max(a,b));
    }

    public getAQIClass(AQI: number): string {
        if (AQI == null) return null;
        return this.namingService.getAQIClassName(AQI);
    }

    private createImageFromBlob(image: Blob): Promise<any> {
        let reader = new FileReader();

        if (image) {
            reader.readAsDataURL(image);
            return new Promise<any>(resolve => {
                reader.onloadend = () => resolve(reader.result);
            });
        }

        return Promise.resolve(null);
    }

    private getLatLong(searchedCity: SearchedCity): Coordinates {
        const latLong: Coordinates = {
            latitude: 0,
            longitude: 0
        };
        searchedCity.locationsResponse.some(location => {
            if (this.hasLatLong(location.coordinates)) {
                latLong.latitude = location.coordinates.latitude;
                latLong.longitude = location.coordinates.longitude;
                return true;
            }
        });
        return latLong;
    }

    private hasLatLong(coordinates: Coordinates): boolean {
        return !!(coordinates && coordinates.latitude && coordinates.longitude);
    }

    private verifyCityAndLatest(searchedCity: SearchedCity, latestResponse: LatestResponse): boolean {
        return !!(searchedCity &&
            searchedCity.city &&
            searchedCity.locationsResponse &&
            searchedCity.locationsResponse.length > 0 &&
            latestResponse &&
            latestResponse.length > 0);
    }

    private getAvailableParameters(searchedCity: SearchedCity): Parameter[] {
        const parameters = [];
        searchedCity.locationsResponse.forEach(location => {
            location.parameters.forEach(newParam => {
                if (parameters.findIndex(foundParam => foundParam === newParam) === -1)
                    parameters.push(newParam);
            });
        });
        return parameters;
    }

    private getParameterAverage(
        parameter: Parameter,
        latestResponse: LatestResponse
    ): ParameterAverage {
        const latestMeasurements = this.getLatestMeasurementsByParameter(parameter, latestResponse);
        const calculationResponses = this.getCalculationResponsesFromMeasurements(latestMeasurements);
        const calculationResponse = this.getAverageCalculationResponse(calculationResponses);
        const className = this.getAQIClass(calculationResponse.AQI);
        const dataPoints = latestMeasurements.length;
        return {
            parameter: parameter,
            concentration: calculationResponse.concentration,
            unit: calculationResponse.unit,
            AQI: calculationResponse.AQI,
            class: className,
            dataPoints: dataPoints,
            message: calculationResponse.message // TODO: also include allMessages, to be handled here or in the consuming component
        }
    }

    private getLatestMeasurementsByParameter(
        parameter: Parameter,
        latestResponse: LatestResponse
    ): LatestMeasurement[] {
        const latestMeasurements: LatestMeasurement[] = [];
        latestResponse.forEach(response => {
            const match = response.measurements
                .find(measurement => measurement.parameter === parameter);
            if (match) latestMeasurements.push(match);
        });
        return latestMeasurements;
    }

    private getCalculationResponsesFromMeasurements(measurements: LatestMeasurement[]): CalculationResponse[] {
        return measurements.map(measurement => this.calculationService.calculateAPIByLatest(measurement));
    }

    private getAverageCalculationResponse(calculationResponses: CalculationResponse[]): CalculationResponse {
        const avgAQI = calculationResponses.reduce((sum, response) => sum + response.AQI, 0) / calculationResponses.length;
        const allMessages = calculationResponses.reduce((messages: CalculationMessage[], response) => messages.concat(response.allMessages), []);

        const checkedUnit = calculationResponses[0].unit; // TODO: potentially handle more than one unit, here or in CalculationService
        const checkedMessage = calculationResponses[0].message;
        const filteredResponses = calculationResponses.filter(response => response.unit === checkedUnit);
        const avgConcentration = filteredResponses.reduce((sum, response) => sum + response.concentration, 0) / filteredResponses.length;

        return {
            AQI: avgAQI,

            unit: checkedUnit,
            concentration: avgConcentration,
            message: checkedMessage,
            allMessages: allMessages
        }
    }
}
