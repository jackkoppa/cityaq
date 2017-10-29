import { Injectable } from '@angular/core';
import { CitiesApi } from '../api/openaq/cities/cities.api';
import { CitiesResponseModel } from '../api/openaq/cities/cities-response.model';
import { CitiesRequestModel } from '../api/openaq/cities/cities-request.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CitiesService {
    constructor(private citiesApi: CitiesApi) {};

    getAllCities(): Observable<CitiesResponseModel[]> {
        let request: CitiesRequestModel = { limit: 9999 };
        return this.citiesApi.getCities(request);
    }
}