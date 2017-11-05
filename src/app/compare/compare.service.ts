import { Injectable } from '@angular/core';
import { CitiesIndividualResponseModel } from '../core/api/openaq/cities/cities-individual-response.model';

@Injectable()
export class CompareService {
    sortCities(cityA: CitiesIndividualResponseModel, cityB: CitiesIndividualResponseModel): number {
        const a = cityA.city.toLowerCase();
        const b = cityB.city.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
}