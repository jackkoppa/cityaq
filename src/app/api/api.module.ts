import { NgModule } from '@angular/core';
import { CitiesApi } from './openaq/cities/cities.api';
import { LatestApi } from './openaq/latest/latest.api';

@NgModule({
  providers: [
      CitiesApi,
      LatestApi
    ]
})
export class ApiModule { }