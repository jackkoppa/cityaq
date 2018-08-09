import { Directive, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[aq-uppercase]'
})
export class UpperCaseDirective implements OnInit, OnDestroy {
    previousValue: any;
    destroy: Subject<void> = new Subject<void>();

    constructor(
        private control: NgControl
    ) { }

    ngOnInit() {
        this.subscribeToChanges();
    }

    ngOnDestroy() {
        this.destroy.next();
    }

    private subscribeToChanges(): void {
        this.control.valueChanges
          .pipe(takeUntil(this.destroy))
          .subscribe(val => this.upperCase(val));
    }

    private upperCase(val: string): void {
        const transformedVal = val.toUpperCase()
        if (val !== transformedVal)
            this.control.control.setValue(transformedVal);
    }
}
