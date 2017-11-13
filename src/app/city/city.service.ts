import { Injectable } from '@angular/core';
import { CalculationService } from '../core/calculation/calculation.service';
import { CalculationNamingService } from '../core/calculation/calculation-naming.service';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { ParametersModel } from '../core/api/openaq/parameters.model';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { SearchedCity } from '../search/searched-city.model';
import { CoordinatesModel } from '../core/api/openaq/coordinates.model';
import { IndividualAQI } from './individual-aqi.model';

@Injectable()
export class CityService {
    
    constructor(
        private calculationService: CalculationService,
        private calculationNamingService: CalculationNamingService,
        private staticMapsHandlerService: StaticMapsHandlerService
    ) {}

    public getAQIByParameter(
        parameter: ParametersModel,
        latestResponse: LatestResponseModel 
    ): number {
        const latestParameterMeasurements: LatestMeasurement[] = [];
        latestResponse.forEach(response => {
            const match = response.measurements
                .find(measurement => measurement.parameter === parameter);
            if (match) latestParameterMeasurements.push(match);
        });
        const aqis = latestParameterMeasurements
            .map(measurement => this.calculationService.calculateAQIByParameter(measurement.value, parameter));
        return aqis.reduce((sum, aqi) => sum + aqi, 0) / aqis.length;
    }

    public getStaticMapsImageFileURL(searchedCity: SearchedCity): Promise<any> {
        const coordinates = this.getLatLong(searchedCity);
        return this.staticMapsHandlerService
            .getImageByLatLong(coordinates.latitude, coordinates.longitude)
            .toPromise()
            .then(res => this.createImageFromBlob(res))
    }

    public getOverallAQI(aqis: IndividualAQI[]): number {
        const aqiValues = aqis.map(aqi => aqi.value);
        if (!aqis || aqis.length <= 0) return 0;
        return aqiValues.reduce((a, b) => {
            return Math.max(a, b);
        });
    }

    public getOverallAQIClass(aqis: IndividualAQI[]): string {
        const aqiValue = this.getOverallAQI(aqis);
        return this.calculationNamingService.getAQIClassName(aqiValue);
    }

    private createImageFromBlob(image: Blob): Promise<any> {
        let reader = new FileReader();

        if (image) {
            reader.readAsDataURL(image);
            return new Promise<any>(resolve => {
                reader.onloadend = () => resolve(reader.result);
            })
        }

        return Promise.resolve(null);
    }

    private getLatLong(searchedCity: SearchedCity): CoordinatesModel {
        const latLong: CoordinatesModel = {
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

    private hasLatLong(coordinates: CoordinatesModel): boolean {
        return !!(coordinates.latitude && coordinates.longitude);
    }
}