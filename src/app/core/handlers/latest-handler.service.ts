import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LatestApi } from '../api/openaq/latest/latest.api';
import { LatestRequest } from '../api/openaq/latest/latest-request.model';
import { LatestResponse } from '../api/openaq/latest/latest-response.model';

@Injectable()
export class LatestHandlerService {
    constructor(private latestApi: LatestApi) {};

    getLatestByCityAndCountry(cityName: string, country: string): Observable<LatestResponse> {
        let request: LatestRequest = {
            city: cityName,
            country: country
        }
        return this.latestApi.getLatest(request);        
    }
}