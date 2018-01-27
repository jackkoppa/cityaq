import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CityCardsListComponent } from '../city/city-cards-list.component';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';
import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { LocationsResponse } from '../core/api/openaq/locations/locations-response.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { MessagingService } from '../shared/messaging/messaging.service';

import { SearchService } from './search.service';
import { SearchedCity } from './searched-city.model';
import { QueryParams } from '../core/routing/params.models';
import { ParamsHelper } from '../core/routing/params.helper';

@Component({
    selector: 'aq-search-bar',
    templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit {
    @Input() allCities: CitiesResponse = [];
    @Input() searching: boolean = false;

    public searchForm: FormGroup;
    public filteredCities: Observable<CitiesResponse>;
    private initialSearch: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private searchService: SearchService,
        private locationsHandlerService: LocationsHandlerService,
        private messagingService: MessagingService
    ) { };

    public ngOnInit(): void {
        this.newForm();
        this.filterCitiesOnInputChange();
    }

    public attemptSearch(): void {
        if (this.searching) return;
        const cityName = this.searchService.validateSearchInput(
            this.searchForm.value['searchInput'],
            this.allCities
        );
        if (cityName) {
            this.navigateToNewCity(cityName);
        } else {
            this.messagingService.error('Please select a valid city from the dropdown');
            this.searching = false;
        }
    }
    
    private newForm(): void {
        this.searchForm = this.fb.group({
            searchInput: ['']
        });
    }

    private filterCitiesOnInputChange(): void {
        this.filteredCities = this.searchForm
            .get('searchInput')
            .valueChanges
            .startWith(null)
            .map(cityName => this.searchService.filterCities(cityName, this.allCities));
    }

    private navigateToNewCity(cityName: string): void {
        const queryParams = Object.assign({}, <QueryParams>this.route.snapshot.queryParams);
        const objectParams = ParamsHelper.queryToObject(queryParams);
        objectParams.cityNames = objectParams.cityNames || [];
        objectParams.cityNames.unshift(cityName);
        this.router.navigate(['/search'], {
            queryParams: ParamsHelper.objectToQuery(objectParams)
        });
    }

    private clearSearchInput(): void {
        this.searchForm.get('searchInput').setValue('');
    }
}