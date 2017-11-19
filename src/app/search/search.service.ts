import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { LocationsResponseModel } from '../core/api/openaq/locations/locations-response.model';
import { Observable } from 'rxjs/Observable';
import { CitiesRequestModel } from '../core/api/openaq/cities/cities-request.model';

@Injectable()
export class SearchService {
    public validateSearchInput(cityName: string, allCities: CitiesResponseModel): string {        
        const match = allCities.find(city => city.city.toUpperCase() === cityName.toUpperCase());
        return match ? match.city : null;
    }

    public filterCities(
        cityName: string,
        allCities: CitiesResponseModel
    ): CitiesResponseModel {
        return cityName ? 
            this.filterCitiesWhenNameExists(cityName, allCities) : 
            allCities.slice(0, 5); 
    }

    private filterCitiesWhenNameExists(
        cityName: string,
        allCities: CitiesResponseModel
    ): CitiesResponseModel {
        const filteredCities: CitiesResponseModel = allCities.filter(city =>
            city.city.toLowerCase().indexOf(cityName.toLowerCase()) === 0);
        return filteredCities.slice(0, 5);
    }
}