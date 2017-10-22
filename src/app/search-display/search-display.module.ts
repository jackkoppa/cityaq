import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchDisplayComponent } from './search-display.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, FormsModule, ReactiveFormsModule],
    declarations: [SearchDisplayComponent],
    exports: [SearchDisplayComponent],
    providers: []
})
export class SearchDisplayModule {}