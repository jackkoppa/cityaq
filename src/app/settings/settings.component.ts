import { Component, Output, EventEmitter } from '@angular/core';

import { FadeAnimation } from '../shared/animations/fade-animation.constant';
import { FadeSlideUpAnimation } from '../shared/animations/fade-slide-up-animation.constant';

@Component({
    selector: 'aq-settings',
    templateUrl: './settings.component.html',
    animations: [FadeAnimation, FadeSlideUpAnimation]
})
export class SettingsComponent {
    @Output() clearAll: EventEmitter<void>;
    public settingItemsVisible: boolean = false;

    public toggleSettingItems(): void {
        this.settingItemsVisible = !this.settingItemsVisible;
    }
}