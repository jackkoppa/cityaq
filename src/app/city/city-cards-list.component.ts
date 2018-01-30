import { Component, OnInit, Input } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser'
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';

import { CitiesResponse } from '../core/api/openaq/cities/cities-response.model';
import { SearchedCity } from '../search/searched-city.model';
import { FadeSlideAnimation } from '../shared/animations/fade-slide-animation.constant';
import { QueryParams } from '../core/routing/params.models';
import { ParamsHelper } from '../core/routing/params.helper';

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

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { };

    ngOnInit(): void {
        
    }

    public deleteCity(cityName: string): void {
        console.log(`deleting ${cityName}`);
        this.removeCityFromParams(cityName);
    }

    private removeCityFromParams(cityName: string): void {
        const queryParams = Object.assign({}, <QueryParams>this.route.snapshot.queryParams);
        const objectParams = ParamsHelper.queryToObject(queryParams);
        objectParams.cityNames = objectParams.cityNames || [];
        objectParams.cityNames = objectParams.cityNames.filter(paramCityName => paramCityName !== cityName);
        this.router.navigate(['/search'], {
            queryParams: ParamsHelper.objectToQuery(objectParams)
        });
    }
}