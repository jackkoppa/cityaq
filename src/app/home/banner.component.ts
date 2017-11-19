import { Component, OnInit } from '@angular/core';

import { ColorName } from '../core/naming/color-name.model';
import { COLOR_VALUES } from '../core/naming/color-values.constant';

@Component({
    selector: 'aq-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
    colors: ColorName[] = [];

    constructor() { };

    ngOnInit() {
        this.setColors();
    }

    private setColors() {
        Object.keys(COLOR_VALUES).reverse().forEach(value => this.colors.push(<ColorName>value));
    }
}