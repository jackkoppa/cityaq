import { Injectable } from '@angular/core';
import { CitiesApi } from '../api/cities/cities.api';
import { CitiesResponseModel } from '../api/cities/cities-response.model';
import { CitiesRequestModel } from '../api/cities/cities-request.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CitiesService {
    constructor(private citiesApi: CitiesApi) {};

    getAllCities(): Observable<CitiesResponseModel[]> {
        let request = new CitiesRequestModel();
        request.limit = 9999;
        return this.citiesApi.getCities(request);
    }
}