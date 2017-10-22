import { NgModule } from '@angular/core';
import { ApiModule } from './api/api.module';
import { HandlersModule } from './handlers/handlers.module';

@NgModule({
    imports: [
        ApiModule, 
        HandlersModule
    ]
})
export class CoreModule {}