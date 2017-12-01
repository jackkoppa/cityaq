import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { LocationsApi } from '../api/openaq/locations/locations.api';
import { LocationsRequest } from '../api/openaq/locations/locations-request.model';
import { LocationsResponse } from '../api/openaq/locations/locations-response.model';

@Injectable()
export class LocationsHandlerService {
    constructor(private locationsApi: LocationsApi) {};

    getLocationsByCityAndCountry(cityName: string, country: string): Observable<LocationsResponse> {
        let request: LocationsRequest = {
            city: cityName,
            country: country
        }
        return this.locationsApi.getLocations(request);        
    }
}