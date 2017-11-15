import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MaterialModule,
        PipesModule
    ],
    exports: [
        BrowserAnimationsModule,
        MaterialModule,
        PipesModule
    ]
})
export class SharedModule {}