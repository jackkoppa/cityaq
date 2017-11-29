import { Injectable } from '@angular/core';
import { CitiesApi } from '../api/openaq/cities/cities.api';
import { CitiesResponse } from '../api/openaq/cities/cities-response.model';
import { CitiesRequest } from '../api/openaq/cities/cities-request.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CitiesHandlerService {
    constructor(private citiesApi: CitiesApi) {};

    getAllCities(): Observable<CitiesResponse> {
        let request: CitiesRequest = { limit: 9999 };
        return this.citiesApi.getCities(request);
    }
}