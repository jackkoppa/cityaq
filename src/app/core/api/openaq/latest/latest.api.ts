// https://docs.openaq.org/#api-Latest

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, BaseRequestOptions } from '@angular/http';
import { LatestRequestModel } from './latest-request.model';
import { LatestResponseModel } from './latest-response.model';
import { ApiService } from '../../api.service';
import { environment } from '../../../../../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LatestApi {
    constructor(
        private http: Http,
        private apiService: ApiService
    ) {}

    public getLatest(request?: LatestRequestModel): Observable<LatestResponseModel> {
        return this.http.get(environment.openaqApiUrl + 'latest?' + this.apiService.buildOpenAQQueryString(request))
            .map(res => res.json().results);
    }
}