import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SearchDisplayModule } from '../search-display/search-display.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [MaterialModule, SearchDisplayModule,],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule {}