import { Component, OnInit, Input } from '@angular/core';

import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';

@Component({
    selector: 'aq-city-cards-list',
    templateUrl: './city-cards-list.component.html'
})
export class CityCardsListComponent implements OnInit {
    @Input() selectedCities: CitiesResponseModel;

    constructor() { };

    ngOnInit(): void {
        //console.log('current selectedCities:', this.selectedCities);
    }
}