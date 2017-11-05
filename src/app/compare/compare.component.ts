import { Component, OnInit } from '@angular/core';

import { CompareService } from './compare.service';
import { CitiesService } from '../core/handlers/cities.service';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';

@Component({
    selector: 'aq-compare',
    templateUrl: './compare.component.html'
})
export class CompareComponent implements OnInit {
    allCities: CitiesResponseModel[] = [];

    constructor(
        private citiesService: CitiesService,
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