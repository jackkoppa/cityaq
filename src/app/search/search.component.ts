import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';

import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { CitiesHandlerService } from '../core/handlers/cities-handler.service';
import { QueryParams, ObjectParams } from '../core/routing/params.models';
import { ParamsHelper } from '../core/routing/params.helper';
import { SearchedCity } from '../search/searched-city.model';

import { SearchService } from './search.service';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'aq-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    public allCities: CitiesResponse = [];
    public searchedCities: SearchedCity[] = [];

    constructor(
        private route: ActivatedRoute,
        private citiesHandlerService: CitiesHandlerService,
        private searchService: SearchService
    ) { };

    public ngOnInit(): void {
        this.loadCities()
            .then(() => {
                this.route.queryParams
                    .subscribe(queryParams => this.searchService
                        .updateCities(<QueryParams>queryParams, this.searchedCities, this.allCities)
                        .subscribe(searchedCities => this.searchedCities = searchedCities));
            });
    }

    private loadCities(): Promise<CitiesResponse> {
        return this.citiesHandlerService.getAllCities()
            .toPromise()
            .then(cities => this.allCities = cities.sort(this.searchService.sortCities));            
    }
}