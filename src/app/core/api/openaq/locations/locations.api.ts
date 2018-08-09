// https://docs.openaq.org/#api-Locations
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';
import { BaseOpenAQResponse } from '../base-openaq-response.model';

import { LocationsRequest } from './locations-request.model';
import { LocationsResponse } from './locations-response.model';

@Injectable()
export class LocationsApi {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    public getLocations(request?: LocationsRequest): Observable<LocationsResponse> {
        return this.http.get<BaseOpenAQResponse<LocationsResponse>>(environment.openaqApiUrl + 'locations?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.results);
    }
}
