import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CityCardsListComponent } from './city-cards-list.component';
import { CityCardComponent } from './city-card.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        CityCardsListComponent,
        CityCardComponent
    ],
    exports: [
        CityCardsListComponent,
        CityCardComponent
    ]
})
export class CityModule {}