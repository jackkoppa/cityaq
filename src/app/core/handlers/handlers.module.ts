import { NgModule } from '@angular/core';
import { CitiesHandlerService } from './cities-handler.service';
import { LatestHandlerService } from './latest-handler.service';

@NgModule({
    providers: [
        CitiesHandlerService,
        LatestHandlerService
    ]
})
export class HandlersModule {}