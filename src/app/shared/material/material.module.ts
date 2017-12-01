import { NgModule } from '@angular/core';

import {     
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule    
 } from '@angular/material';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule, 
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule 
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule, 
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule 
    ]
})
export class MaterialModule {}