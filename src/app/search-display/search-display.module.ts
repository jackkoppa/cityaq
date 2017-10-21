import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchDisplayComponent } from './search-display.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [MaterialModule, FormsModule, ReactiveFormsModule],
    declarations: [SearchDisplayComponent],
    exports: [SearchDisplayComponent],
    providers: []
})
export class SearchDisplayModule {}