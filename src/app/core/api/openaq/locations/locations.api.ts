// https://docs.openaq.org/#api-Locations
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
            .pipe(map(res => res.results));
    }
}
