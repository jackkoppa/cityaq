import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

@NgModule({
    imports: [
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [SearchComponent],
    exports: [SearchComponent],
    providers: [SearchService]
})
export class SearchModule { }