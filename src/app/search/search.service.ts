import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';

interface ValidationResult {
    [index: string]: boolean;
}

@Injectable()
export class SearchService {
    public validateSearchInput(control: FormControl): ValidationResult {
        
        return { invalid: true };
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