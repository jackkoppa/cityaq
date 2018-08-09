import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { CityCardsListComponent } from '../city/city-cards-list.component';
import { CitiesIndividualResponse } from '../core/api/openaq/cities/cities-individual-response.model';
import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { LocationsResponse } from '../core/api/openaq/locations/locations-response.model';
import { LocationsHandlerService } from '../core/handlers/locations-handler.service';
import { ParamsHelper } from '../core/routing/params.helper';
import { QueryParams } from '../core/routing/params.models';
import { StorageService } from '../core/storage/storage.service';
import { MessagingService } from '../shared/messaging/messaging.service';

import { SearchService } from './search.service';
import { SearchedCity } from './searched-city.model';
import { SearchingStatus } from './searching-status.model';

@Component({
    selector: 'aq-search-bar',
    templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit, OnChanges {
    @Input() allCities: CitiesResponse = [];
    @Input() searchingTrigger: Subject<boolean>;
    public searching: boolean = false;

    public searchForm: FormGroup;
    public filteredCities: Observable<CitiesResponse>;
    private initialSearch: boolean = false;
    private previousForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private searchService: SearchService,
        private locationsHandlerService: LocationsHandlerService,
        private messagingService: MessagingService,
        private storageService: StorageService
    ) {
        this.searchService.searchingStatus.subscribe(status => {
            if (this.searching && status === SearchingStatus.Finished) this.clearSearchInput();
            this.searching = status === SearchingStatus.Started;
        })
    };

    public ngOnInit(): void {
        this.newForm();
        this.checkForFirstSession();
    }

    public ngOnChanges(): void {
        if (this.searchForm !== this.previousForm) {
            this.previousForm = this.searchForm;
            this.filterCitiesOnInputChange(); // ensure that filtering happens against newest form
        }
    }

    public attemptSearch(): void {
        if (this.searching) return;
        const cityName = this.searchService.validateSearchInput(
            this.searchForm.value['searchInput'],
            this.allCities
        );
        if (cityName) {
            this.addCityToParams(cityName);
        } else {
            this.messagingService.error('Please select a valid city from the dropdown');
            this.searching = false;
        }
    }

    public onFocus(): void {
        this.searchService.setStatusFocused();
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
            .pipe(startWith(''),
              map(cityName => this.searchService.filterCities(cityName, this.allCities)));
    }

    private addCityToParams(cityName: string): void {
        const queryParams = Object.assign({}, <QueryParams>this.route.snapshot.queryParams);
        const objectParams = ParamsHelper.queryToObject(queryParams);
        objectParams.cityNames = objectParams.cityNames || [];
        objectParams.cityNames.unshift(cityName);
        this.router.navigate(['/search'], {
            queryParams: ParamsHelper.objectToQuery(objectParams)
        });
    }

    private checkForFirstSession(): void {
        if (this.storageService.sessionStartedSnapshot !== true) {
            const objectParams = this.storageService.favoritesSnapshot || { cityNames: [] };
            this.router
                .navigate(['/search'], {
                    queryParams: ParamsHelper.objectToQuery(objectParams)
                })
                .then(() => this.storageService.startNewSession());
        }
    }

    private clearSearchInput(): void {
        this.searchForm.get('searchInput').setValue('');
    }
}
