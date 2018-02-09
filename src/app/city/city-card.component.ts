import { Component, OnInit, Input } from '@angular/core';

import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { Parameter } from '../core/api/openaq/parameter.model';
import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { FadeAnimation  } from '../shared/animations/fade-animation.constant';
import { SearchedCity } from '../search/searched-city.model';

import { CityService } from './city.service';
import { ParameterAverage } from './individual-aqi.model';
import { LatestCityMeasurements } from './latest-city-measurements.model';

@Component({
    selector: 'aq-city-card',
    templateUrl: './city-card.component.html',
    animations: [FadeAnimation]
})
export class CityCardComponent implements OnInit {
    @Input() searchedCity: SearchedCity;
    public latestResponse: LatestResponse;
    public parameterAverages: ParameterAverage[] = [];
    public overallAQI: number;
    public overallAQIClass: string;
    public staticMapsURL: any = '';
    public expanded: boolean = false;
    public x: number = 0;

    get contentClass(): string {
        return this.expanded ? 'expanded ' + this.getRowsClass() : 'closed';
    }

    get buttonIcon(): string {
        return this.expanded ? 'expand_less' : 'expand_more';
    }
    
    constructor(
        private cityService: CityService,
        private latestHandlerService: LatestHandlerService,
        private staticMapsHandlerService: StaticMapsHandlerService
    ) { };
    
    
    ngOnInit() {
        this.getLatestCityMeasurements()
            .subscribe(latest => this.setAveragesAndClasses(latest));
        this.cityService.getStaticMapsImageFileURL(this.searchedCity)
            .then(url => this.staticMapsURL = url);
    }

    public toggleContent(): void {
        this.expanded = !this.expanded;
    }

    public onPan(event: any): void {
        this.x = event.deltaX;
    }

    public onPanEnd(event: any): void {
        setTimeout(() => this.x = 0, 0);
    }
    
    private getRowsClass(): string {
        return 'rows-' + Math.ceil(this.parameterAverages.length / 2)
    }
    
    private getLatestCityMeasurements(): Observable<LatestResponse> {
        return this.latestHandlerService
            .getLatestByCityAndCountry(this.searchedCity.city, this.searchedCity.country);
    }

    private setAveragesAndClasses(latest: LatestResponse): void {
        this.latestResponse = latest;
        this.parameterAverages = this.cityService.getParameterAverages(
            this.searchedCity, 
            this.latestResponse
        );
        this.overallAQI = this.cityService.getOverallAQI(this.parameterAverages);
        this.overallAQIClass = this.cityService.getAQIClass(this.overallAQI);        
    }
}