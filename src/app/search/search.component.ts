import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SearchService } from './search.service';
import { CitiesResponseModel } from '../core/api/openaq/cities/cities-response.model';
import { CitiesIndividualResponseModel } from '../core/api/openaq/cities/cities-individual-response.model';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'aq-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @Input() allCities: CitiesResponseModel = [];
    filteredCities: Observable<CitiesResponseModel>;
    searchForm: FormGroup;

    constructor(
        private searchService: SearchService,
        private fb: FormBuilder
    ) { };

    public ngOnInit(): void {
        this.newForm();
        this.filterCitiesOnInputChange();
    }

    public attemptSearch(): void {
        
    }

    private addToSearchedCities(event: any) {
        
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
}