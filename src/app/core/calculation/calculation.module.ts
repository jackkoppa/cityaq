import { NgModule } from '@angular/core';

import { CalculationService } from './calculation-new.service';
import { PhysicalCalculationService } from './physical/physical-calculation.service';

@NgModule({
    providers: [
        CalculationService,
        PhysicalCalculationService
    ]
})
export class CalculationModule {}