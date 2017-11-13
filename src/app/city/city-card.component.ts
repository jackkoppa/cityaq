import { Component, OnInit, Input } from '@angular/core';

import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { ParametersModel } from '../core/api/openaq/parameters.model';
import { SearchedCity } from '../search/searched-city.model';
import { CityService } from './city.service';
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
    latestResponse: LatestResponseModel;
    aqis: AQI[] = [];
    staticMapsURL: any = '';

    constructor(
        private latestHandlerService: LatestHandlerService,
        private staticMapsHandlerService: StaticMapsHandlerService,
        private cityService: CityService
    ) { };

    ngOnInit() {
        console.log('searchedCity:', this.searchedCity);
        this.getLatestCityMeasurements()
            .subscribe(latest => {
                this.getAvailableParameters()
                    .forEach(param => this.aqis.push({
                        parameter: param, 
                        value: this.cityService.getAQIByParameter(param, this.latestResponse)
                    }));
            });
        this.cityService.getStaticMapsImageFileURL(this.searchedCity)
            .then(url => this.staticMapsURL = url);
    }

    private getLatestCityMeasurements(): Observable<LatestResponseModel> {
        return this.getLatest()
            .map(latest => this.latestResponse = latest);
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

    private getLatest(): Observable<LatestResponseModel> {
        const cityName = this.searchedCity.city;
        const country = this.searchedCity.country;
        return this.latestHandlerService.getLatestByCityAndCountry(cityName, country);
    }
}