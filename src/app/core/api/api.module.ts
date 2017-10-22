import { NgModule } from '@angular/core';
import { CitiesApi } from './cities/cities.api';
import { LatestApi } from './latest/latest.api';

@NgModule({
    providers: [
        CitiesApi,
        LatestApi
    ]
})
export class ApiModule { }