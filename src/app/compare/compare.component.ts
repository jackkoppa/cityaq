import { Component, OnInit } from '@angular/core';

import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { CitiesHandlerService } from '../core/handlers/cities-handler.service';
import { SearchedCity } from '../search/searched-city.model';

import { CompareService } from './compare.service';

@Component({
    selector: 'aq-compare',
    templateUrl: './compare.component.html'
})
export class CompareComponent implements OnInit {
    allCities: CitiesResponse = [];
    searchedCities: SearchedCity[] = [];

    constructor(
        private citiesHandlerService: CitiesHandlerService,
        private compareService: CompareService
    ) { };

    public ngOnInit(): void {
        this.loadCities();
    }

    public loadCities(): void {
        this.citiesHandlerService.getAllCities()
            .subscribe(cities => this.allCities = cities.sort(this.compareService.sortCities));
    }

    public addSearchedCity(searchedCity: SearchedCity): void {
        this.searchedCities.unshift(searchedCity);
    }
}