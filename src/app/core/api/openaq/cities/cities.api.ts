// https://docs.openaq.org/#api-Cities
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable } from 'rxjs/Observable';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';

import { CitiesResponse } from './cities-response.model';
import { CitiesRequest } from './cities-request.model';

@Injectable()
export class CitiesApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getCities(request?: CitiesRequest): Observable<CitiesResponse> {
        return this.http.get(environment.openaqApiUrl + 'cities?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.json().results);
    }
}