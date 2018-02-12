import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ParamsHelper } from '../core/routing/params.helper'
import { StorageService } from '../core/storage/storage.service';
import { FadeAnimation } from '../shared/animations/fade-animation.constant';
import { FadeSlideUpAnimation } from '../shared/animations/fade-slide-up-animation.constant';
import { MessagingService } from '../shared/messaging/messaging.service';

@Component({
    selector: 'aq-settings',
    templateUrl: './settings.component.html',
    animations: [FadeAnimation, FadeSlideUpAnimation]
})
export class SettingsComponent {
    public settingItemsVisible: boolean = false;
    private _hasFavorites: boolean = false;

    public get hasFavorites(): boolean {
        return this.hasFavorites;
    }

    constructor(
        private router: Router,
        private storageService: StorageService,
        private messagingService: MessagingService
    ) {
        this.storageService.favoritesChange
            .subscribe(favorites => this._hasFavorites = favorites && favorites.cityNames && favorites.cityNames.length > 0)
    }

    public toggleSettingItems(): void {
        this.settingItemsVisible = !this.settingItemsVisible;
    }

    public goToFavorites(): void {
        const objectParams = this.storageService.favoritesSnapshot;
        this.router
            .navigate(['/search'], {
                queryParams: ParamsHelper.objectToQuery(objectParams)
            })
            .then(() => {
                this.messagingService.info('Now viewing favorites');
                this.settingItemsVisible = false;
            });
    }

    public resetFavorites(): void {
        this.storageService.removeAllFavorites();
        this.messagingService.info('Favorites have been reset');
        this.settingItemsVisible = false;
    }

    public clearAll(): void {
        const objectParams = { cityNames: [] }
        this.router
            .navigate(['/search'], {
                queryParams: ParamsHelper.objectToQuery(objectParams)
            })
            .then(() => {
                this.messagingService.info('Cleared current view');
                this.settingItemsVisible = false;
            });
    }
}