import { NgModule } from '@angular/core';

import { StorageService } from './storage.service';

@NgModule({
    providers: [
        {
            provide: 'Window',
            useValue: window
        },
        StorageService
    ]
})
export class StorageModule {}