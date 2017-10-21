import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../handlers/cities.service';
import { LatestService } from '../handlers/latest.service';
import { CitiesResponseModel } from '../api/openaq/cities/cities-response.model';
import { LatestResponseModel } from '../api/openaq/latest/latest-response.model';

@Component({
    selector: 'viz-search-display',
    templateUrl: './home.component.html'
})

export class CityDisplayComponent{
    constructor(
        private citiesService: CitiesService,
        private latestService: LatestService
      ) {};
      testMsg: string = "Hello - I am Home."
      allCities: CitiesResponseModel[] = [];
      latestInfo: LatestResponseModel; 
      searchedCities: string[];
    
      ngOnInit() {
        
      }
    
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

    addToSearchedCities(event:any){
       searchedCities.push( document.getElementById('cityInput').value )
    }
}