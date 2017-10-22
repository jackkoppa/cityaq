import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {     
    MatCardModule, 
    MatButtonModule,
    MatAutocompleteModule
 } from '@angular/material';

@NgModule({
    imports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule
    ],
    exports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule {}