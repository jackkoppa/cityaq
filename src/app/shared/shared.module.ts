import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DirectivesModule } from './directives/directives.module';
import { MaterialModule } from './material/material.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        DirectivesModule,
        MaterialModule,
        PipesModule
    ],
    exports: [
        BrowserAnimationsModule,
        DirectivesModule,
        MaterialModule,
        PipesModule
    ]
})
export class SharedModule {}