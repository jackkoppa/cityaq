import { Injectable } from '@angular/core';
import { LocationsApi } from '../api/openaq/locations/locations.api';
import { LocationsRequest } from '../api/openaq/locations/locations-request.model';
import { LocationsResponseModel } from '../api/openaq/locations/locations-response.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationsHandlerService {
    constructor(private locationsApi: LocationsApi) {};

    getLocationsByCityAndCountry(city: string, country: string): Observable<LocationsResponseModel> {
        let request: LocationsRequest = {
            city: city,
            country: country
        }
        return this.locationsApi.getLocations(request);        
    }
}