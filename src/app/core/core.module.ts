import { NgModule } from '@angular/core';

import { ApiModule } from './api/api.module';
import { CalculationModule } from './calculation/calculation.module';
import { HandlersModule } from './handlers/handlers.module';
import { NamingModule } from './naming/naming.module';
import { StorageModule } from './storage/storage.module';

@NgModule({
    imports: [
        ApiModule,
        CalculationModule, 
        HandlersModule,
        NamingModule,
        StorageModule
    ]
})
export class CoreModule {}