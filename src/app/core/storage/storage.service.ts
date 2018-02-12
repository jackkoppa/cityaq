import { Injectable, Inject } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ObjectParams } from '../routing/params.models';

import { LocalStorage, SessionStorage } from './storage.models';

@Injectable()
export class StorageService {
    public favoritesChange: ReplaySubject<ObjectParams> = new ReplaySubject<ObjectParams>(1);

    private readonly window: Window;
    private readonly local: LocalStorage;
    private readonly session: SessionStorage;

    private get favorites(): ObjectParams {
        return JSON.parse(this.local.getItem('favorites')) as ObjectParams;
    }

    private set favorites(favorites: ObjectParams) {
        this.local.setItem('favorites', JSON.stringify(favorites));
        this.favoritesChange.next(this.favorites);
    }
    
    private get sessionStarted(): boolean {
        return JSON.parse(this.session.getItem('sessionStarted')) as boolean;
    }

    private set sessionStarted(sessionStarted: boolean) {
        this.session.setItem('sessionStarted', JSON.stringify(sessionStarted));
    }

    constructor(@Inject('Window') window: any) {
        this.window = window as Window;
        this.local = this.window.localStorage as LocalStorage;
        this.session = this.window.sessionStorage as SessionStorage;
        this.favoritesChange.next(this.favorites);
    }

    public get favoritesSnapshot(): ObjectParams {
        return this.favorites;
    }
    
    public removeAllFavorites(): void {
        this.favorites = null;
    }

    public isFavorite(cityName: string): boolean {
        const currentFavorites = this.favorites || { cityNames: [] };
        return !!(currentFavorites.cityNames.find(name => name === cityName))
    }

    public addFavorite(cityName: string): void {
        const newFavorites = this.favorites || { cityNames: [] };
        if (!newFavorites.cityNames.find(name => name === cityName)) {
            newFavorites.cityNames.unshift(cityName);
            this.favorites = newFavorites;
        }
    }

    public removeFavorite(cityName: string): void {
        const newFavorites = this.favorites || { cityNames: [] };
        const updatedNames = newFavorites.cityNames.filter(name => name !== cityName);
        newFavorites.cityNames = updatedNames;
        this.favorites = newFavorites;
    }

    public get sessionStartedSnapshot(): boolean {
        return this.sessionStarted;
    }

    public startNewSession(): void {
        this.sessionStarted = true;
    }
}