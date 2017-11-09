import { Component, OnInit } from '@angular/core';

import { CompareService } from './compare.service';
import { CitiesHandlerService } from '../core/handlers/cities-handler.service';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';

@Component({
    selector: 'aq-compare',
    templateUrl: './compare.component.html'
})
export class CompareComponent implements OnInit {
    allCities: CitiesResponseModel = [];
    selectedCities: CitiesResponseModel = [];

    constructor(
        private citiesService: CitiesHandlerService,
        private compareService: CompareService
    ) { };

    public ngOnInit(): void {
        this.loadCities();
    }

    loadCities() {
        this.citiesService.getAllCities()
            .subscribe(cities => this.allCities = cities.sort(this.compareService.sortCities));
    }
}