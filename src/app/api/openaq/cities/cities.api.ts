// https://docs.openaq.org/#api-Cities
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { CitiesRequestModel } from './cities-request.model';
import { CitiesResponseModel } from './cities-response.model';
import 'rxjs/add/operator/map';
import {Observable } from 'rxjs/Observable';

@Injectable()
export class CitiesApi {
    constructor(private http: Http) {}

    public getCities(request?: CitiesRequestModel ): Observable<CitiesResponseModel[]> {
        return this.http.get('https://api.openaq.org/v1/cities').map(res => (<CitiesResponseModel[]>res.json().results));
    }
}