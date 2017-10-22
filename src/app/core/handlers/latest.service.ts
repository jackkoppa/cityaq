import { Injectable } from '@angular/core';
import { LatestApi } from '../api/latest/latest.api';
import { LatestResponseModel } from '../api/latest/latest-response.model';
import { LatestRequestModel } from '../api/latest/latest-request.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LatestService {
    constructor(private latestApi: LatestApi) {};

    getLatestPM25ByCity(city: string): Observable<LatestResponseModel[]> {
        let request = new LatestRequestModel();
        request.city = city;
        request.parameter = 'pm25';
        return this.latestApi.getLatest(request);
    }
}