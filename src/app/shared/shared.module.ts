import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DirectivesModule } from './directives/directives.module';
import { MaterialModule } from './material/material.module';
import { MessagingModule } from './messaging/messaging.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        DirectivesModule,
        MaterialModule,
        MessagingModule,
        PipesModule
    ],
    exports: [
        BrowserAnimationsModule,
        DirectivesModule,
        MaterialModule,
        MessagingModule,
        PipesModule
    ]
})
export class SharedModule {}