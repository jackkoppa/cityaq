import { NgModule } from '@angular/core';

import { ApiService } from './api.service';
import { CitiesApi } from './openaq/cities/cities.api';
import { LatestApi } from './openaq/latest/latest.api';
import { LocationsApi } from './openaq/locations/locations.api';

import { StaticMapsApi } from './maps/static-images/static-maps.api';

@NgModule({
    providers: [
        ApiService,
        CitiesApi,
        LatestApi,
        LocationsApi,
        StaticMapsApi
    ]
})
export class ApiModule { }