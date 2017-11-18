import { NgModule } from '@angular/core';

import {     
    MatCardModule, 
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule    
 } from '@angular/material';

@NgModule({
    imports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule {}