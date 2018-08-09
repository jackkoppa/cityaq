// https://docs.openaq.org/#api-Latest
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../../environments/environment';
import { ApiService } from '../../api.service';
import { BaseOpenAQResponse } from '../base-openaq-response.model';

import { LatestRequest } from './latest-request.model';
import { LatestResponse } from './latest-response.model';

@Injectable()
export class LatestApi {
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) {}

    public getLatest(request?: LatestRequest): Observable<LatestResponse> {
        return this.http.get<BaseOpenAQResponse<LatestResponse>>(environment.openaqApiUrl + 'latest?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.results);
    }
}
