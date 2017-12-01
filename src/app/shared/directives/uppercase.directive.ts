import { Directive, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

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
            .takeUntil(this.destroy)            
            .subscribe(val => this.upperCase(val));
    }

    private upperCase(val: string): void {
        const transformedVal = val.toUpperCase()
        if (val !== transformedVal)
            this.control.control.setValue(transformedVal);
    }
}