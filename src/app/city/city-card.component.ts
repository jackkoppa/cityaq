import { Component, OnInit, Input } from '@angular/core';

import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { CalculationService } from '../core/calculation/calculation.service';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';
import { ParametersModel } from '../core/api/openaq/parameters.model';
import { SearchedCity } from '../search/searched-city.model';
import { LatestCityMeasurements } from './latest-city-measurements.model';
import { Observable } from 'rxjs/Observable';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';

interface AQI {
    parameter: ParametersModel,
    value: number
}

@Component({
    selector: 'aq-city-card',
    templateUrl: './city-card.component.html'
})
export class CityCardComponent implements OnInit {
    @Input() searchedCity: SearchedCity;
    latestCityMeasurements: LatestCityMeasurements;
    aqis: AQI[] = [];

    constructor(
        private latestHandlerService: LatestHandlerService,
        private calculationService: CalculationService
    ) { };

    ngOnInit() {
        console.log('searchedCity:', this.searchedCity);
        this.getLatestCityMeasurements()
            .then(() => {
                
                this.aqis.push({
                    parameter: 'pm25', 
                    value: this.getParameterAQI('pm25')
                });
                this.aqis.push({
                    parameter: 'so2', 
                    value: this.getParameterAQI('so2')
                });
            });
    }

    public getLatestCityMeasurements(): Promise<void> {
        return this.getLatest()
            .map(latest => {
                this.latestCityMeasurements = this.searchedCity;
                this.latestCityMeasurements.latestResponse = latest;
            })
            .toPromise();
    }

    public getParameterAQI(parameter: ParametersModel): number {
        const latestParameterMeasurements: LatestMeasurement[] = [];
        this.latestCityMeasurements
            .latestResponse
            .forEach(response => {
                const match = response.measurements
                    .find(measurement => measurement.parameter === parameter);
                if (match) latestParameterMeasurements.push(match);
            });
        const aqis = latestParameterMeasurements
            .map(measurement => this.calculationService.calculateAQIByParameter(measurement.value, parameter));
        return aqis.reduce((sum, aqi) => sum + aqi, 0) / aqis.length;
    }

    private getLatest(): Observable<LatestResponseModel> {
        const cityName = this.searchedCity.city;
        const country = this.searchedCity.country;
        return this.latestHandlerService.getLatestByCityAndCountry(cityName, country);
    }
}