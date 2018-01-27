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

@Component({
    selector: 'aq-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    public allCities: CitiesResponse = [];
    public searchedCities: SearchedCity[] = [];
    public searching: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private citiesHandlerService: CitiesHandlerService,
        private searchService: SearchService
    ) { };

    public ngOnInit(): void {
        this.loadCities()
            .then(() => {
                this.route.queryParams
                    .subscribe(queryParams => this.updateCities(<QueryParams>queryParams)
                        .subscribe(searchedCities => this.searchedCities = searchedCities));
            });
    }

    private loadCities(): Promise<CitiesResponse> {
        return this.citiesHandlerService.getAllCities()
            .toPromise()
            .then(cities => this.allCities = cities.sort(this.searchService.sortCities));            
    }

    private updateCities(queryParams: QueryParams): Observable<SearchedCity[]> {
        const objectParams = ParamsHelper.queryToObject(queryParams);
        let updatedSearchedCities = this.removeOldCities(objectParams);
        return this.addNewCities(objectParams, updatedSearchedCities);
    }

    private removeOldCities(objectParams: ObjectParams): SearchedCity[] {
        return this.searchedCities
            .filter(searchedCity => objectParams.cityNames.find(cityName => cityName === searchedCity.city));
    }

    private addNewCities(objectParams: ObjectParams, updatedSearchedCities: SearchedCity[]): Observable<SearchedCity[]> {
        objectParams.cityNames && objectParams.cityNames
            .filter(cityName => !updatedSearchedCities.find(searchedCity => searchedCity.city === cityName))
        if (!objectParams.cityNames || objectParams.cityNames.length <= 0) {
            return Observable.of(updatedSearchedCities);
        } else {
            this.searching = true;
            return Observable.forkJoin(objectParams.cityNames
                    .map(cityName => this.searchService.search(cityName, this.allCities))
                ).do(searchedCities => this.searching = false);                
        }
    }
}