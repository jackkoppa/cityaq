import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';

import { SlideDeleteComponent } from './slide-delete.component';

@NgModule({
    imports: [MaterialModule],
    exports: [SlideDeleteComponent],
    declarations: [SlideDeleteComponent]
})
export class ComponentsModule {}
