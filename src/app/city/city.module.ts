import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CityCardsListComponent } from './city-cards-list.component';
import { CityCardComponent } from './city-card.component';
import { CityDetailComponent } from './city-detail.component';
import { AQIIndicatorComponent } from './aqi-indicator.component';
import { CityService } from './city.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AQIIndicatorComponent,
        CityCardsListComponent,
        CityCardComponent,
        CityDetailComponent
    ],
    exports: [
        AQIIndicatorComponent,
        CityCardsListComponent,
        CityCardComponent,
        CityDetailComponent
    ],
    providers: [CityService]
})
export class CityModule {}