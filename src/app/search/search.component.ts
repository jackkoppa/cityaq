import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SearchService } from './search.service';
import { SearchedCity } from './searched-city.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { CitiesIndividualResponseModel } from '../core/api/openaq/cities/cities-individual-response.model';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { LocationsResponseModel } from '../core/api/openaq/locations/locations-response.model';
import { CityCardsListComponent } from '../city/city-cards-list.component';

@Component({
    selector: 'aq-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @Input() allCities: CitiesResponseModel = [];
    @Output() addSearchedCity: EventEmitter<SearchedCity> = new EventEmitter<SearchedCity>();
    filteredCities: Observable<CitiesResponseModel>;
    searchForm: FormGroup;
    searching: boolean = false;

    constructor(
        private fb: FormBuilder,
        private searchService: SearchService,
        private locationsHandlerService: LocationsHandlerService
    ) { };

    public ngOnInit(): void {
        this.newForm();
        this.filterCitiesOnInputChange();
    }

    public attemptSearch(): void {
        if (this.searchForm.valid) this.search();
    }
    
    private newForm(): void {
        this.searchForm = this.fb.group({
            searchInput: ['', this.searchService.validateSearchInput]
        });
    }

    private filterCitiesOnInputChange(): void {
        this.filteredCities = this.searchForm
            .get('searchInput')
            .valueChanges
            .startWith(null)
            .map(cityName => this.searchService.filterCities(cityName, this.allCities));
    }

    private search(): void {
        this.searching = true;
        const cityName = this.searchForm.value['searchInput'];
        const city = this.allCities.find(city => city.city === cityName);
        const country = city.country;
        this.locationsHandlerService
            .getLocationsByCityAndCountry(cityName, country)
            .subscribe(locations => this.outputSearchedCity(city, locations));
    }

    private outputSearchedCity(city: CitiesIndividualResponseModel, locations: LocationsResponseModel): void {
        this.searching = false;
        const searchedCity: SearchedCity = city;
        searchedCity.locationsResponse = locations;
        this.addSearchedCity.emit(searchedCity);
    }
}