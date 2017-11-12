import { Component, OnInit, Input } from '@angular/core';
import { FadeSlideAnimation } from '../shared/animations/fade-slide-animation.constant';
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { SearchedCity } from '../search/searched-city.model';

@Component({
    selector: 'aq-city-cards-list',
    templateUrl: './city-cards-list.component.html',
    animations: [
        FadeSlideAnimation
    ]
})
export class CityCardsListComponent implements OnInit {
    @Input() searchedCities: SearchedCity[];
    animationStarted: boolean = false;

    constructor() { };

    ngOnInit(): void {
        
    }
}