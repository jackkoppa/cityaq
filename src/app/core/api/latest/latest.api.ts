// https://docs.openaq.org/#api-Latest

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { LatestRequestModel } from './latest-request.model';
import { LatestResponseModel } from './latest-response.model';
import { ApiHelper } from '../api.helper';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import {Observable } from 'rxjs/Observable';

@Injectable()
export class LatestApi {
    constructor(private http: Http) {}

    public getLatest(request?: LatestRequestModel): Observable<LatestResponseModel[]> {
        return this.http.get(environment.openaqApiUrl + 'latest?' + ApiHelper.buildQueryString(request))
            .map(res => <LatestResponseModel[]>res.json().results);
    }
}