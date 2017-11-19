import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material'

import { MessagingService } from './messaging.service';

@NgModule({
    imports: [MatSnackBarModule],
    providers: [MessagingService]
})
export class MessagingModule {}