import { Injectable } from '@angular/core';

import { Coordinates } from '../core/api/openaq/coordinates.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { Parameter } from '../core/api/openaq/parameter.model';
import { CalculationService } from '../core/calculation/calculation.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { NamingService } from '../core/naming/naming.service';
import { SearchedCity } from '../search/searched-city.model';

import { ParameterAverage } from './individual-aqi.model';
import { LatestCityMeasurements } from './latest-city-measurements.model';

@Injectable()
export class CityService {
    
    constructor(
        private calculationService: CalculationService,
        private namingService: NamingService,
        private staticMapsHandlerService: StaticMapsHandlerService
    ) {}

    public getStaticMapsImageFileURL(searchedCity: SearchedCity): Promise<any> {
        const coordinates = this.getLatLong(searchedCity);
        return this.staticMapsHandlerService
            .getImageByLatLong(coordinates.latitude, coordinates.longitude)
            .toPromise()
            .then(res => this.createImageFromBlob(res))
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
            console.log(location);
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
        const concentration = this.getConcentrationAvgByParameter(parameter, latestMeasurements);
        const unit = this.getUnit(latestMeasurements);
        const AQI = this.getAQIByParameterAndConcentration(parameter, concentration);
        const className = this.getAQIClass(AQI);
        const dataPoints = latestMeasurements.length;
        return {
            parameter: parameter,
            concentration: concentration,
            unit: unit,
            AQI: AQI,
            class: className,
            dataPoints: dataPoints
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

    private getConcentrationAvgByParameter(
        parameter: Parameter,
        latestMeasurements: LatestMeasurement[]
    ): number {
        const concentrations: number[] = latestMeasurements
            .map(measurement => measurement.value);
        return concentrations.reduce((sum, aqi) => sum + aqi, 0) / concentrations.length;
    }

    private getUnit(latestMeasurements: LatestMeasurement[]): string {
        let unit: string;
        const discrepancy: boolean = latestMeasurements.some(measurement => {
            if (unit && unit != measurement.unit) return true;
            else unit = measurement.unit;
        });
        if (discrepancy) {
            const units = latestMeasurements.map(measurement => measurement.unit).toString()
            throw new Error(`Tried to calculate averages of different units for parameter ${latestMeasurements[0].parameter}, with units ${units}`)
        } else {
            return unit;
        }    
    }
    
    private getAQIByParameterAndConcentration(
        parameter: Parameter,
        concentration: number 
    ): number {
        return 0; //this.calculationService.calculateAQIByParameter(concentration, parameter);
    }
}