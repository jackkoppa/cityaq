import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CityCardsListComponent } from './city-cards-list.component';
import { CityCardComponent } from './city-card.component';
import { CityDetailComponent } from './city-detail.component';
import { CityService } from './city.service';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        CityCardsListComponent,
        CityCardComponent,
        CityDetailComponent
    ],
    exports: [
        CityCardsListComponent,
        CityCardComponent,
        CityDetailComponent
    ],
    providers: [CityService]
})
export class CityModule {}