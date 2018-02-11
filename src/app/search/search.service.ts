import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';

import { CitiesRequest } from '../core/api/openaq/cities/cities-request.model';
import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';
import { LocationsResponse } from '../core/api/openaq/locations/locations-response.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { QueryParams, ObjectParams } from '../core/routing/params.models';
import { MessagingService } from '../shared/messaging/messaging.service';

import { SearchedCity } from './searched-city.model';
import { ParamsHelper } from '../core/routing/params.helper';
import { SearchingStatus } from './searching-status.model';
import { ServiceWorkerHelper } from '../shared/service-worker/service-worker.helper';

@Injectable()
export class SearchService {
    
    private triggerSearchingStatus: Subject<SearchingStatus> = new Subject<SearchingStatus>();
    
    public get searchingStatus(): Observable<SearchingStatus> {
        return this.triggerSearchingStatus;
    };

    constructor(
        private messagingService: MessagingService,
        private locationsHandlerService: LocationsHandlerService
    ) { }

    public setStatusFocused(): void {
        this.triggerSearchingStatus.next(SearchingStatus.Focused);
    }

    public setStatusBlurred(): void {
        this.triggerSearchingStatus.next(SearchingStatus.Blurred);
    }

    public setStatusStarted(): void {
        this.triggerSearchingStatus.next(SearchingStatus.Started);
    }

    public setStatusFinished(): void {
        this.triggerSearchingStatus.next(SearchingStatus.Finished);
    }


    public search(cityName: string, allCities: SearchedCity[]): Observable<SearchedCity> {
        const city = allCities.find(city => city.city === cityName);
        if (!city || !city.country) {
            this.messagingService.warn(`${cityName.toUpperCase()} is not in the list of available OpenAQ cities`, 'slow');
            return Observable.of(null);
        }
        const country = city.country;
        return this.locationsHandlerService
            .getLocationsByCityAndCountry(cityName, country)
            .map(locations => {
                city.locationsResponse = locations;
                return city;
            })
            .catch(err => {
                if(ServiceWorkerHelper.isServiceWorkerTimeout(err)) {
                    this.messagingService.warnDismissable(
                        `You are currently offline, and no measurements have been saved for ${cityName.toUpperCase()}\n` + 
                        `Measurements will be loaded when connection is restored`
                    );
                } else {
                    this.messagingService.errorDismissable(
                        `Failed to retrieve data for ${cityName.toUpperCase()} from OpenAQ`,
                        [`Search error for ${cityName}, ${city}: `, err]
                    );
                }
                return Observable.of(null);
            });
    }

    public sortCities(cityA: CitiesIndividualResponse, cityB: CitiesIndividualResponse): number {
        const a = cityA.city.toLowerCase();
        const b = cityB.city.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    public validateSearchInput(cityName: string, allCities: CitiesResponse): string {        
        const match = allCities.find(city => city.city.toUpperCase() === cityName.toUpperCase());
        return match ? match.city : null;
    }

    public filterCities(
        cityName: string,
        allCities: CitiesResponse
    ): CitiesResponse {
        return cityName ? 
            this.filterCitiesWhenNameExists(cityName, allCities) : 
            allCities.slice(0, 5); 
    }

    public updateCities(
        queryParams: QueryParams,
        searchedCities: SearchedCity[],
        allCities: SearchedCity[]
     ): Observable<SearchedCity[]> {
        const objectParams = ParamsHelper.queryToObject(queryParams);
        let updatedSearchedCities = this.removeOldCities(objectParams, searchedCities) || [];
        return this.addNewCities(objectParams, updatedSearchedCities, allCities);
    }

    private filterCitiesWhenNameExists(
        cityName: string,
        allCities: CitiesResponse
    ): CitiesResponse {
        const filteredCities: CitiesResponse = allCities.filter(city =>
            city.city.toLowerCase().indexOf(cityName.toLowerCase()) === 0);
        return filteredCities.slice(0, 5);
    }

    private removeOldCities(
        objectParams: ObjectParams,
        searchedCities: SearchedCity[]
    ): SearchedCity[] {
        return searchedCities
            .filter(searchedCity => objectParams.cityNames && objectParams.cityNames.find(cityName => cityName === searchedCity.city));
    }

    private addNewCities(
        objectParams: ObjectParams,
        updatedSearchedCities: SearchedCity[],
        allCities: SearchedCity[]
    ): Observable<SearchedCity[]> {
        const newCityNames = objectParams.cityNames && objectParams.cityNames
            .filter(cityName => !updatedSearchedCities.find(searchedCity => searchedCity.city === cityName))
        if (!newCityNames || newCityNames.length <= 0) {
            return Observable.of(updatedSearchedCities);
        } else {
            this.setStatusStarted()
            return Observable.forkJoin(objectParams.cityNames
                    .map(cityName => this.search(cityName, allCities))             
                )
                .map(searchedCities => searchedCities.filter(searchedCity => searchedCity != null))
                .do(searchedCities => this.setStatusFinished());                
        }
    }
}