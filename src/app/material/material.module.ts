import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {     
    MatCardModule, 
    MatButtonModule,
    MatAutocompleteModule
 } from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule {}