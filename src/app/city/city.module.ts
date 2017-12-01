import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { AQIIndicatorComponent } from './aqi-indicator.component';
import { CityCardComponent } from './city-card.component';
import { CityCardsListComponent } from './city-cards-list.component';
import { CityDetailComponent } from './city-detail.component';
import { CityService } from './city.service';
import { ParameterAverageIndicatorComponent } from './parameter-average-indicator.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        AQIIndicatorComponent,
        CityCardComponent,
        CityCardsListComponent,
        CityDetailComponent,
        ParameterAverageIndicatorComponent
    ],
    exports: [
        AQIIndicatorComponent,
        CityCardComponent,
        CityCardsListComponent,
        CityDetailComponent,
        ParameterAverageIndicatorComponent
    ],
    providers: [CityService]
})
export class CityModule {}