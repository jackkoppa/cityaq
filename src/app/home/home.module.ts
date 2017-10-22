import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SearchDisplayModule } from '../search-display/search-display.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SearchDisplayModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule {}