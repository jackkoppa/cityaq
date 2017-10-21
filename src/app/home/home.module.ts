import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [MaterialModule],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule {}