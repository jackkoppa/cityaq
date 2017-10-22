import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchDisplayService } from './search-display.service';
import { SearchDisplayComponent } from './search-display.component';

@NgModule({
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [SearchDisplayComponent],
    exports: [SearchDisplayComponent],
    providers: [SearchDisplayService]
})
export class SearchDisplayModule {}