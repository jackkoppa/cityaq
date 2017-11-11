import { Component, OnInit, Input } from '@angular/core';
import { SearchedCity } from '../search/searched-city.model';

@Component({
    selector: 'aq-city-card',
    templateUrl: './city-card.component.html'
})
export class CityCardComponent implements OnInit {
    @Input() searchedCity: SearchedCity;

    constructor() { };

    ngOnInit() {
        console.log('searchedCity:', this.searchedCity);
    }
}