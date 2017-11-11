import { Component, OnInit, Input } from '@angular/core';

import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { SearchedCity } from '../search/searched-city.model';

@Component({
    selector: 'aq-city-cards-list',
    templateUrl: './city-cards-list.component.html'
})
export class CityCardsListComponent implements OnInit {
    @Input() searchedCities: SearchedCity[];

    constructor() { };

    ngOnInit(): void {
        
    }
}