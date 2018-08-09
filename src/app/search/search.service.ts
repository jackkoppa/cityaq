import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, Subject, of, forkJoin } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { CitiesRequest } from '../core/api/openaq/cities/cities-request.model';
import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';
import { LocationsResponse } from '../core/api/openaq/locations/locations-response.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { QueryParams, ObjectParams } from '../core/routing/params.models';
import { MessagingService } from '../shared/messaging/messaging.service';
import { CountryNamePipe } from '../shared/pipes/country-name.pipe';
import { ServiceWorkerHelper } from '../shared/service-worker/service-worker.helper';

import { SearchedCity } from './searched-city.model';
import { ParamsHelper } from '../core/routing/params.helper';
import { SearchingStatus } from './searching-status.model';

@Injectable()
export class SearchService {

    private triggerSearchingStatus: Subject<SearchingStatus> = new Subject<SearchingStatus>();

    public get searchingStatus(): Observable<SearchingStatus> {
        return this.triggerSearchingStatus;
    };

    constructor(
        private messagingService: MessagingService,
        private locationsHandlerService: LocationsHandlerService,
        private countryNamePipe: CountryNamePipe
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
            this.messagingService.warn(`${cityName.toUpperCase()} is not tracked by OpenAQ`, 'slow');
            return of(null);
        }
        const country = city.country;
        return this.locationsHandlerService
            .getLocationsByCityAndCountry(cityName, country)
            .pipe(map(locations => {
                city.locationsResponse = locations;
                return city;
            }), catchError(err => {
              if(ServiceWorkerHelper.isServiceWorkerTimeout(err)) {
                  this.messagingService.warnDismissable(
                      `Currently offline, and no location information has been saved for ${cityName.toUpperCase()} - ` +
                      `will be loaded when connection is restored`
                  );
              } else {
                  this.messagingService.errorDismissable(
                      `Failed to retrieve location data for ${cityName.toUpperCase()} from OpenAQ`,
                      [`Search error for ${cityName}: `, city, err]
                  );
              }
              return of(null);
          }));
    }

    public sortCities(cityA: CitiesIndividualResponse, cityB: CitiesIndividualResponse): number {
        const a = cityA.city.toLowerCase();
        const b = cityB.city.toLowerCase();
        const digitFirstRegEx = new RegExp(/^\d+.*$/);
        const aDigitFirst: boolean = digitFirstRegEx.test(a);
        const bDigitFirst: boolean = digitFirstRegEx.test(b);

        if (!aDigitFirst && bDigitFirst) return -1;
        if (aDigitFirst && !bDigitFirst) return 1;

        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    public validateSearchInput(cityName: string, allCities: CitiesResponse): string {
        const match = allCities.find(city => city.city.toUpperCase() === cityName.toUpperCase());
        return match ? match.city : null;
    }

    public filterCities(
        searchTerm: string,
        allCities: CitiesResponse
    ): CitiesResponse {
        return searchTerm ?
            this.filterCitiesWhenSearchTermExists(searchTerm, allCities) :
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

    private filterCitiesWhenSearchTermExists(
        searchTerm: string,
        allCities: CitiesResponse
    ): CitiesResponse {
        const filteredCities: CitiesResponse = allCities.filter(filteredCity => {
            const city = filteredCity.city.toLowerCase();
            const country = this.countryNamePipe.transform(filteredCity.country).toLowerCase();
            const variations: string[] = [
                `${city} ${country}`,
                `${city}, ${country}`,
                `${country} ${city}`,
                `${country}, ${city}`
            ]
            return variations.some(searchFormat => searchFormat.indexOf(searchTerm.trim().toLowerCase()) === 0);
        })
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
            return of(updatedSearchedCities);
        } else {
            this.setStatusStarted()
            return forkJoin(objectParams.cityNames
                    .map(cityName => this.search(cityName, allCities))
                )
                .pipe(map(searchedCities => searchedCities.filter(searchedCity => searchedCity != null)),
                  tap(searchedCities => this.setStatusFinished()));
        }
    }
}
