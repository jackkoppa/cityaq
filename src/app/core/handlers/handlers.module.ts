import { NgModule } from '@angular/core';
import { CitiesHandlerService } from './cities-handler.service';
import { LatestHandlerService } from './latest-handler.service';
import { LocationsHandlerService } from './locations-handler.service';
import { StaticMapsHandlerService } from './static-maps-handler.service';

@NgModule({
    providers: [
        CitiesHandlerService,
        LatestHandlerService,
        LocationsHandlerService,
        StaticMapsHandlerService
    ]
})
export class HandlersModule {}