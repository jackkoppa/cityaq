// https://docs.openaq.org/#api-Cities
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import {Observable } from 'rxjs/Observable';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';
import { BaseOpenAQResponse } from '../base-openaq-response.model';

import { CitiesResponse } from './cities-response.model';
import { CitiesRequest } from './cities-request.model';

@Injectable()
export class CitiesApi {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    public getCities(request?: CitiesRequest): Observable<CitiesResponse> {
        return this.http.get<BaseOpenAQResponse<CitiesResponse>>(environment.openaqApiUrl + 'cities?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.results);
    }
}
