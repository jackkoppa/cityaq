import { Component, OnInit, Input } from '@angular/core';

import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';
import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { Parameter } from '../core/api/openaq/parameter.model';
import { SearchedCity } from '../search/searched-city.model';
import { FadeAnimation  } from '../shared/animations/fade-animation.constant';

import { CityService } from './city.service';
import { LatestCityMeasurements } from './latest-city-measurements.model';
import { ParameterAverage } from './individual-aqi.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Component({
    selector: 'aq-city-card',
    templateUrl: './city-card.component.html',
    animations: [FadeAnimation]
})
export class CityCardComponent implements OnInit {
    @Input() searchedCity: SearchedCity;
    latestResponse: LatestResponseModel;
    //aqis: ParameterAverage[] = [];
    parameterAverages: ParameterAverage[] = [];
    overallAQI: number;
    overallAQIClass: string;
    staticMapsURL: any = '';
    expanded: boolean = false;

    get contentClass(): string {
        return this.expanded ? 'expanded' : 'closed';
    }

    get buttonIcon(): string {
        return this.expanded ? 'expand_less' : 'expand_more';
    }
    
    constructor(
        private latestHandlerService: LatestHandlerService,
        private staticMapsHandlerService: StaticMapsHandlerService,
        private cityService: CityService
    ) { };
    
    
    ngOnInit() {
        console.log('searchedCity:', this.searchedCity);
        this.getLatestCityMeasurements()
            .subscribe(latest => this.setAveragesAndClasses(latest));
        this.cityService.getStaticMapsImageFileURL(this.searchedCity)
            .then(url => this.staticMapsURL = url);
    }

    public toggleContent(): void {
        this.expanded = !this.expanded;
    }
    
    private getLatestCityMeasurements(): Observable<LatestResponseModel> {
        return this.latestHandlerService
            .getLatestByCityAndCountry(this.searchedCity.city, this.searchedCity.country);
    }

    private setAveragesAndClasses(latest: LatestResponseModel): void {
        this.latestResponse = latest;
        this.parameterAverages = this.cityService.getParameterAverages(
            this.searchedCity, 
            this.latestResponse
        );
        this.overallAQI = this.cityService.getOverallAQI(this.parameterAverages);
        this.overallAQIClass = this.cityService.getOverallAQIClass(this.overallAQI);        
    }
}