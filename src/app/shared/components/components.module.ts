import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { SlideDeleteComponent } from './slide-delete.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [SlideDeleteComponent],
    declarations: [SlideDeleteComponent]
})
export class ComponentsModule {}
