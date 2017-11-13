import { Injectable } from '@angular/core';
import { CalculationService } from '../core/calculation/calculation.service';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { ParametersModel } from '../core/api/openaq/parameters.model';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { SearchedCity } from '../search/searched-city.model';
import { CoordinatesModel } from '../core/api/openaq/coordinates.model';

@Injectable()
export class CityService {
    
    constructor(
        private calculationService: CalculationService,
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

    private getLatLong(searchedCity: SearchedCity): LatLong {
        const latLong: LatLong = {
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

interface LatLong {
    latitude: number;
    longitude: number;
}