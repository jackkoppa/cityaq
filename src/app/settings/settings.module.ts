import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/material.module';

import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [SettingsComponent],
    exports: [SettingsComponent]
})
export class SettingsModule {}