// https://docs.openaq.org/#api-Cities
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { CitiesRequestModel } from './cities-request.model';
import { CitiesResponseModel } from './cities-response.model';
import { ApiService } from '../../api.service';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import {Observable } from 'rxjs/Observable';

@Injectable()
export class CitiesApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getCities(request?: CitiesRequestModel): Observable<CitiesResponseModel> {
        return this.http.get(environment.openaqApiUrl + 'cities?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.json().results);
    }
}