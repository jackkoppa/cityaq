import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchDisplayService } from './search-display.service';
import { CitiesService } from '../core/handlers/cities.service';
import { LatestService } from '../core/handlers/latest.service';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'aq-search-display',
    templateUrl: './search-display.component.html'
})
export class SearchDisplayComponent implements OnInit {
    allCities: CitiesResponseModel[] = [];
    filteredCities: Observable<CitiesResponseModel[]>;
    searchedLocations: LatestResponseModel[] = [];
    cityCtrl: FormControl;

    constructor(
        private searchDisplayService: SearchDisplayService,
        private citiesService: CitiesService,
        private latestService: LatestService
    ) { };

    ngOnInit() {
        this.cityCtrl = new FormControl();
        this.loadCities();
        this.filteredCities = this.cityCtrl.valueChanges
            .startWith(null)
            .map(cityName => cityName ? 
                this.searchDisplayService.filterCities(cityName, this.allCities) : 
                this.allCities.slice(0, 5));
    }

    loadCities() {
        this.citiesService.getAllCities()
            .subscribe(cities => this.allCities = cities.sort(this.searchDisplayService.sortCities));
    }

    loadLatest(cityName: string) {
        this.latestService.getLatestPM25ByCity(cityName)
            .subscribe(latest => {
                if(this.searchDisplayService.validateLatestResponse(latest[0])) 
                    this.searchedLocations.push(latest[0]);
            });
    }

    addToSearchedCities(event: any) {
        this.loadLatest(this.cityCtrl.value);
    }

    getClass(location: LatestResponseModel): string {
        return this.searchDisplayService.pm25Color(location);
    }
}