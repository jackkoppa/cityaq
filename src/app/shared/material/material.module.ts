import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {     
    MatCardModule, 
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule   
 } from '@angular/material';

@NgModule({
    imports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MaterialModule {}