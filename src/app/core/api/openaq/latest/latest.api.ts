// https://docs.openaq.org/#api-Latest
import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';

import { LatestRequest } from './latest-request.model';
import { LatestResponse } from './latest-response.model';

@Injectable()
export class LatestApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getLatest(request?: LatestRequest): Observable<LatestResponse> {
        return this.http.get(environment.openaqApiUrl + 'latest?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.json().results);
    }
}