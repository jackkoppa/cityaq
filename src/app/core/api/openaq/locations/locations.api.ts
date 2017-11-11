// https://docs.openaq.org/#api-Locations

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { LocationsRequest } from './locations-request.model';
import { LocationsResponseModel } from './locations-response.model';
import { ApiService } from '../../api.service';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationsApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getLocations(request?: LocationsRequest): Observable<LocationsResponseModel> {
        return this.http.get(environment.openaqApiUrl + 'locations?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.json().results);
    }
}