import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { GesturesModule } from './gestures/gestures.module';
import { MaterialModule } from './material/material.module';
import { MessagingModule } from './messaging/messaging.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        ComponentsModule,
        DirectivesModule,
        GesturesModule,
        MaterialModule,
        MessagingModule,
        PipesModule
    ],
    exports: [
        BrowserAnimationsModule,
        ComponentsModule,
        DirectivesModule,
        GesturesModule,
        MaterialModule,
        MessagingModule,
        PipesModule
    ]
})
export class SharedModule {}