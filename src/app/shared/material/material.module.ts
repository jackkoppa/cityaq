import { NgModule } from '@angular/core';

import {     
    MatCardModule, 
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule    
 } from '@angular/material';

@NgModule({
    imports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports: [
        MatCardModule, 
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressBarModule
    ]
})
export class MaterialModule {}