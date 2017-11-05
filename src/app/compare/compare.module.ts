import { NgModule } from '@angular/core';

import { SearchModule } from '../search/search.module';

import { CompareComponent } from './compare.component';
import { CompareService } from './compare.service';

@NgModule({
    imports: [SearchModule],
    declarations: [CompareComponent],
    exports: [CompareComponent],
    providers: [CompareService]
})
export class CompareModule { }