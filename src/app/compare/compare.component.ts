import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CompareService } from './compare.service';
import { CitiesHandlerService } from '../core/handlers/cities-handler.service';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { SearchedCity } from '../search/searched-city.model';

@Component({
    selector: 'aq-compare',
    templateUrl: './compare.component.html'
})
export class CompareComponent implements OnInit {
    @Output() searchStarted: EventEmitter<boolean> = new EventEmitter<boolean>();
    allCities: CitiesResponseModel = [];
    searchedCities: SearchedCity[] = [];

    constructor(
        private citiesHandlerService: CitiesHandlerService,
        private compareService: CompareService
    ) { };

    public ngOnInit(): void {
        this.loadCities();
    }

    public loadCities() {
        this.citiesHandlerService.getAllCities()
            .subscribe(cities => this.allCities = cities.sort(this.compareService.sortCities));
    }

    public addSearchedCity(searchedCity: SearchedCity): void {
        this.searchedCities.unshift(searchedCity);
    }

    public setSearchStarted(started: boolean): void {
        this.searchStarted.emit(started);
    }
}