import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { CitiesRequest } from '../core/api/openaq/cities/cities-request.model';
import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { LocationsResponse } from '../core/api/openaq/locations/locations-response.model';
import { MessagingService } from '../shared/messaging/messaging.service';

import { SearchedCity } from './searched-city.model';

@Injectable()
export class SearchService {
    constructor(
        private messagingService: MessagingService,
        private locationsHandlerService: LocationsHandlerService
    ) { }

    public search(cityName: string, allCities: SearchedCity[]): Observable<SearchedCity> {
        const city = allCities.find(city => city.city === cityName);
        const country = city.country;
        return this.locationsHandlerService
            .getLocationsByCityAndCountry(cityName, country)
            .map(locations => {
                city.locationsResponse = locations;
                return city;
            }, error => {
                this.messagingService.error(
                    `Failed to find data for ${cityName.toUpperCase()}`,
                    `Search error for ${cityName}, ${city}: ${error}`
                );
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

    private filterCitiesWhenNameExists(
        cityName: string,
        allCities: CitiesResponse
    ): CitiesResponse {
        const filteredCities: CitiesResponse = allCities.filter(city =>
            city.city.toLowerCase().indexOf(cityName.toLowerCase()) === 0);
        return filteredCities.slice(0, 5);
    }
}