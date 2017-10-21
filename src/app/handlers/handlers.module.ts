import { NgModule } from '@angular/core';
import { CitiesService } from './cities.service';
import { LatestService } from './latest.service';

@NgModule({
    providers: [
        CitiesService,
        LatestService
    ]
})
export class HandlersModule {}