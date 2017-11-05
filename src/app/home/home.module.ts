import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CompareModule } from '../compare/compare.module';

import { HomeComponent } from './home.component';
import { IntroComponent } from './intro.component';

@NgModule({
    imports: [
        SharedModule,
        CompareModule
    ],
    declarations: [
        HomeComponent,
        IntroComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {}