import { NgModule } from '@angular/core';
import { CitiesHandlerService } from './cities-handler.service';
import { LatestHandlerService } from './latest-handler.service';
import { LocationsHandlerService } from './locations-handler.service';

@NgModule({
    providers: [
        CitiesHandlerService,
        LatestHandlerService,
        LocationsHandlerService
    ]
})
export class HandlersModule {}