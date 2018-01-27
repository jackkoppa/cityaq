import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CityModule } from '../city/city.module';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './search.component';
import { SearchBarComponent } from './search-bar.component';
import { SearchService } from './search.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CityModule,
        SharedModule
    ],
    declarations: [
        SearchComponent,
        SearchBarComponent
    ],
    exports: [SearchComponent],
    providers: [SearchService]
})
export class SearchModule { }