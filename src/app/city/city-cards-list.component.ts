import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { SearchedCity } from '../search/searched-city.model';

@Component({
    selector: 'aq-city-cards-list',
    templateUrl: './city-cards-list.component.html',
    animations: [
        trigger(
            'fadeSlide',
            [
                transition(
                    ':enter', 
                    [
                        style({transform: 'translateY(-100%)', opacity: 0}),
                        animate('300ms', style({transform: 'translateY(0)', 'opacity': 1}))
                    ]
                ),
                transition(
                    ':leave', 
                    [
                        style({transform: 'translateY(0)', 'opacity': 1}),
                        animate('300ms', style({transform: 'translateY(-100%)', 'opacity': 0}))              
                    ]
                )
            ]
        )
    ]
})
export class CityCardsListComponent implements OnInit {
    @Input() searchedCities: SearchedCity[];
    animationStarted: boolean = false;

    constructor() { };

    ngOnInit(): void {
        
    }
}