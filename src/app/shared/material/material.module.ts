import { NgModule } from '@angular/core';

import {     
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule    
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
        MatProgressSpinnerModule,
        MatTooltipModule 
    ],
    exports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule, 
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatTooltipModule 
    ]
})
export class MaterialModule {}