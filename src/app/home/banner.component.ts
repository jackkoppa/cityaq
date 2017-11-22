import { Component, OnInit } from '@angular/core';

import { MessagingService } from '../shared/messaging/messaging.service';
import { ColorName } from '../core/naming/color-name.model';
import { COLOR_VALUES } from '../core/naming/color-values.constant';

@Component({
    selector: 'aq-banner',
    templateUrl: './banner.component.html'
})
export class BannerComponent implements OnInit {
    colors: ColorName[] = [];

    constructor(private messagingService: MessagingService) { };

    ngOnInit() {
        this.setColors();
    }

    public openMenu(): void {
        this.messagingService.notify('Menu is under development :)');
    }

    private setColors(): void {
        Object.keys(COLOR_VALUES).reverse().forEach(value => this.colors.push(<ColorName>value));
    }
}