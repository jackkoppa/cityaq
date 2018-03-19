import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ColorName } from '../core/naming/color-name.model';
import { COLOR_VALUES } from '../core/naming/color-values.constant';
import { FadeAnimation } from '../shared/animations/fade-animation.constant';

@Component({
    selector: 'aq-banner',
    templateUrl: './banner.component.html',
    animations: [FadeAnimation]
})
export class BannerComponent implements OnInit {
    @Input() menuVisible: boolean = false;
    @Input() userOnboarded: boolean = false;
    @Output() toggleMenu: EventEmitter<void> = new EventEmitter<void>();
    public colors: ColorName[] = [];

    constructor() { };

    public ngOnInit() {
        this.setColors();
    }

    public triggerToggleMenu(): void {
        this.toggleMenu.emit();
    }

    private setColors(): void {
        Object.keys(COLOR_VALUES).reverse().forEach(value => this.colors.push(<ColorName>value));
    }
}