import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../core/handlers/cities.service';
import { LatestService } from '../core/handlers/latest.service';
import { CitiesResponseModel } from '../core/api/cities/cities-response.model';
import { LatestResponseModel } from '../core/api/latest/latest-response.model';

@Component({
    selector: 'viz-home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(
        private citiesService: CitiesService,
        private latestService: LatestService
    ) { };

    testMsg: string = "Hello - I am Home."
    allCities: CitiesResponseModel[] = [];
    latestInfo: LatestResponseModel;

    ngOnInit() { }

    loadCities() {
        console.log('loadCities called');
        this.citiesService.getAllCities().subscribe(cities => {
            for (let i = 0; i < 50; i++) {
                this.allCities.push(cities[i])
            }
            console.log(this.allCities);
        });
    }

    loadLatest(city: string) {
        console.log('loadLatest called');
        this.latestService.getLatestPM25ByCity(city).subscribe(latest => {
            this.latestInfo = latest[0];
        });
    }
}