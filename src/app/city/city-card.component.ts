import { Component, OnInit, Input } from '@angular/core';

import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { CalculationService } from '../core/calculation/calculation.service';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { ParametersModel } from '../core/api/openaq/parameters.model';
import { SearchedCity } from '../search/searched-city.model';
import { LatestCityMeasurements } from './latest-city-measurements.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

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
    latestMeasurements: LatestResponseModel;
    aqis: AQI[] = [];

    constructor(
        private latestHandlerService: LatestHandlerService,
        private staticMapsHandlerService: StaticMapsHandlerService,
        private calculationService: CalculationService
    ) { };

    ngOnInit() {
        console.log('searchedCity:', this.searchedCity);
        this.getLatestCityMeasurements()
            .subscribe(latest => {
                this.getAvailableParameters()
                    .forEach(param => this.aqis.push({
                        parameter: param, 
                        value: this.getParameterAQI(param)
                    }));
            });
    }

    private getLatestCityMeasurements(): Observable<LatestResponseModel> {
        return this.getLatest()
            .map(latest => this.latestMeasurements = latest);
    }

    private getAvailableParameters(): ParametersModel[] {
        const parameters = [];
        this.searchedCity.locationsResponse.forEach(location => {
            location.parameters.forEach(newParam => {
                if (parameters.findIndex(foundParam => foundParam === newParam) === -1)
                    parameters.push(newParam);
            });
        });
        return parameters;
    }

    private getParameterAQI(parameter: ParametersModel): number {
        const latestParameterMeasurements: LatestMeasurement[] = [];
        this.latestMeasurements
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