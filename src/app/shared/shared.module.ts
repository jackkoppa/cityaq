import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MaterialModule
    ],
    exports: [
        BrowserAnimationsModule,
        MaterialModule
    ]
})
export class SharedModule {}