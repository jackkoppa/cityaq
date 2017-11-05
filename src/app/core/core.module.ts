import { NgModule } from '@angular/core';

import { ApiModule } from './api/api.module';
import { CalculationModule } from './calculation/calculation.module';
import { HandlersModule } from './handlers/handlers.module';

@NgModule({
    imports: [
        ApiModule,
        CalculationModule, 
        HandlersModule
    ]
})
export class CoreModule {}