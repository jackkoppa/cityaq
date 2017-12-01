// https://docs.openaq.org/#api-Locations
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';

import { LocationsRequest } from './locations-request.model';
import { LocationsResponse } from './locations-response.model';

@Injectable()
export class LocationsApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getLocations(request?: LocationsRequest): Observable<LocationsResponse> {
        return this.http.get(environment.openaqApiUrl + 'locations?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.json().results);
    }
}