import { NgModule } from '@angular/core';
import { CalculationService } from './calculation.service';
import { CalculationNamingService } from './calculation-naming.service';

@NgModule({
    providers: [ 
        CalculationService,
        CalculationNamingService
    ]
})
export class CalculationModule {}