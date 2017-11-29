import { Injectable } from '@angular/core';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';

@Injectable()
export class CompareService {
    sortCities(cityA: CitiesIndividualResponse, cityB: CitiesIndividualResponse): number {
        const a = cityA.city.toLowerCase();
        const b = cityB.city.toLowerCase();
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
}