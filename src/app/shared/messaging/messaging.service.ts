import { Injectable } from '@angular/core';

import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';

type MessageDuration = 'very-fast' | 'fast' | 'medium' | 'slow' | 'very-slow'

type DismissAction = 'GOT IT'

const DURATION_MAP = new Map<MessageDuration, number>([
    ['very-fast', 1500],
    ['fast', 2500],
    ['medium', 3500],
    ['slow', 5000],
    ['very-slow', 6500]
])

@Injectable()
export class MessagingService {
    constructor(private matSnackBar: MatSnackBar) {}

    public error(
        msg: string,
        consoleMsg?: any[],
        duration: MessageDuration = 'medium'
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, consoleMsg, duration, undefined, 'error');
    }

    public errorDismissable(
        msg: string,
        consoleMsg?: any[],
        dismissAction: DismissAction = 'GOT IT'
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, consoleMsg, undefined, dismissAction, 'error');
    }

    public warn(
        msg: string,
        duration: MessageDuration = 'medium',
        dismissAction?: DismissAction,
        consoleMsg?: any[]
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, consoleMsg, duration, dismissAction, 'warn');
    }

    public warnDismissable(
        msg: string,
        consoleMsg?: any[],
        dismissAction: DismissAction = 'GOT IT'
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, consoleMsg, undefined, dismissAction, 'warn');
    }

    public info(
        msg: string,
        duration: MessageDuration = 'fast'
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, undefined, duration, undefined, 'info');
    }

    public notifyDismissable(
        msg: string,
        dismissAction: DismissAction = 'GOT IT'
    ): MatSnackBarRef<SimpleSnackBar> {
        return this.triggerPrompt(msg, undefined, undefined, dismissAction, 'info');
    }

    private triggerPrompt(
        msg: string,
        consoleMsg: any[],
        duration: MessageDuration,
        dismissAction: DismissAction,
        severity: 'error' | 'warn' | 'info'
    ): MatSnackBarRef<SimpleSnackBar> {
        consoleMsg && severity && console[severity](...consoleMsg);
        return this.matSnackBar.open(msg, dismissAction, {
            duration: DURATION_MAP.get(duration),
            panelClass: [severity]
        });
    }
}
