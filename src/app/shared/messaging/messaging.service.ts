import { Injectable } from '@angular/core';

import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class MessagingService {
    constructor(private matSnackBar: MatSnackBar) {}

    public error(msg: string, consoleMsg?: string): MatSnackBarRef<SimpleSnackBar> {
        consoleMsg && console.error(consoleMsg);
        return this.matSnackBar.open(msg, undefined, {
            duration: 3000,
            extraClasses: ['error']
        });                
    }

    public notify(msg: string): MatSnackBarRef<SimpleSnackBar> {
        return this.matSnackBar.open(msg, undefined, {
            duration: 2000,
            extraClasses: ['notify']
        });
    }
}