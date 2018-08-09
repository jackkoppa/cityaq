import { Component, OnInit, Input } from '@angular/core';

import { LatestMeasurement } from '../core/api/openaq/latest/latest-measurement.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { Parameter } from '../core/api/openaq/parameter.model';
import { LatestHandlerService } from '../core/handlers/latest-handler.service';
import { StaticMapsHandlerService } from '../core/handlers/static-maps-handler.service';
import { StorageService } from '../core/storage/storage.service';
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
    public retrievedMsg: string;
    private isFavorite: boolean = false;

    get contentClass(): string {
        return this.expanded ? 'expanded ' + this.getRowsClass() : 'closed';
    }

    get expandIcon(): string {
        return this.expanded ? 'expand_less' : 'expand_more';
    }

    get favoriteIcon(): string {
        return this.isFavorite ? 'favorite' : 'favorite_border';
    }

    constructor(
        private cityService: CityService,
        private latestHandlerService: LatestHandlerService,
        private staticMapsHandlerService: StaticMapsHandlerService,
        private storageService: StorageService
    ) { };


    ngOnInit() {
        this.storageService.favoritesChange
            .subscribe(favorites => this.isFavorite = this.storageService.isFavorite(this.searchedCity.city))
        this.cityService.getLatestCityMeasurements(this.searchedCity)
            .subscribe(latest => this.setAveragesAndClasses(latest));
        this.cityService.getStaticMapsImageFileURL(this.searchedCity)
            .then(url => this.staticMapsURL = url);

    }

    public toggleContent(): void {
        this.expanded = !this.expanded;
    }

    public toggleFavorite(): void {
        this.storageService.isFavorite(this.searchedCity.city) ?
            this.storageService.removeFavorite(this.searchedCity.city) :
            this.storageService.addFavorite(this.searchedCity.city);
    }

    private getRowsClass(): string {
        return 'rows-' + Math.ceil(this.parameterAverages.length / 2)
    }

    private setAveragesAndClasses(latest: LatestResponse): void {
        this.latestResponse = latest;
        this.parameterAverages = this.cityService.getParameterAverages(
            this.searchedCity,
            this.latestResponse
        );
        this.overallAQI = this.cityService.getOverallAQI(this.parameterAverages);
        this.overallAQIClass = this.cityService.getAQIClass(this.overallAQI);
        this.setRetrievedMsg(latest);
    }

    private setRetrievedMsg(latest: LatestResponse): void {
        const timestamps: string[] = [];
        const measurements = latest.map(latestIndividual => {
            return latestIndividual.measurements;
        });
        measurements.forEach(measurement => {
            measurement.forEach(latestMeasurement => (latestMeasurement && latestMeasurement.lastUpdated) ?
                timestamps.push(latestMeasurement.lastUpdated) : null)
        });
        const dates = timestamps.map(timestamp => Math.round(new Date(timestamp).getTime()));
        const newest = Math.max(...dates);
        this.retrievedMsg = `Retrieved ${new Date(newest).toLocaleString()}`;
    }
}
