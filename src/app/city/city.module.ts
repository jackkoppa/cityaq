import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CityCardComponent } from './city-card.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        CityCardComponent
    ],
    exports: [
        CityCardComponent
    ]
})
export class CityModule {}