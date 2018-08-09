import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CitiesApi } from '../api/openaq/cities/cities.api';
import { CitiesRequest } from '../api/openaq/cities/cities-request.model';
import { CitiesResponse } from '../api/openaq/cities/cities-response.model';

@Injectable()
export class CitiesHandlerService {
    constructor(private citiesApi: CitiesApi) {};

    getAllCities(): Observable<CitiesResponse> {
        let request: CitiesRequest = { limit: 9999 };
        return this.citiesApi.getCities(request);
    }
}
