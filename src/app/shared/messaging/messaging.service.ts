import { Injectable } from '@angular/core';

import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';

type MessageDuration = 'very-fast' | 'fast' | 'medium' | 'slow' | 'extra-slow'

const DURATION_MAP = new Map<MessageDuration, number>([
    ['very-fast', 1500],
    ['fast', 2500],
    ['medium', 3500],
    ['slow', 5000],
    ['extra-slow', 6500]
])

@Injectable()
export class MessagingService {
    constructor(private matSnackBar: MatSnackBar) {}

    public error(msg: string, consoleMsg?: string, duration: MessageDuration = 'medium'): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, consoleMsg, duration, 'error');           
    }

    public warn(msg: string, consoleMsg?: string, duration: MessageDuration = 'medium'): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, consoleMsg, duration, 'warn');             
    }

    public notify(msg: string, duration: MessageDuration = 'fast'): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, undefined, duration, undefined);
    }

    private triggerPrompt(msg: string, consoleMsg, duration: MessageDuration, severity: 'error' | 'warn'): MatSnackBarRef<SimpleSnackBar> {
        consoleMsg && severity && console[severity](consoleMsg);
        return this.matSnackBar.open(msg, undefined, {
            duration: DURATION_MAP.get(duration),
            extraClasses: [severity]
        });
    }
}