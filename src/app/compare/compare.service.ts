import { Injectable } from '@angular/core';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';

@Injectable()
export class CompareService {
    sortCities(cityA: CitiesResponseModel, cityB: CitiesResponseModel): number {
        const a = cityA.city.toLowerCase();
        const b = cityB.city.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
}