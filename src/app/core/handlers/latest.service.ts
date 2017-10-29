import { Injectable } from '@angular/core';
import { LatestApi } from '../api/openaq/latest/latest.api';
import { LatestResponseModel } from '../api/openaq/latest/latest-response.model';
import { LatestRequestModel } from '../api/openaq/latest/latest-request.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LatestService {
    constructor(private latestApi: LatestApi) {};

    getLatestPM25ByCity(city: string): Observable<LatestResponseModel[]> {
        let request: LatestRequestModel = {
            city: city,
            parameter: 'pm25'
        }
        return this.latestApi.getLatest(request);
    }
}