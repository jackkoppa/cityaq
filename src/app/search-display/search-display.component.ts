import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesService } from '../core/handlers/cities.service';
import { LatestService } from '../core/handlers/latest.service';
import { CitiesResponseModel } from '../core/api/cities/cities-response.model';
import { LatestResponseModel } from '../core/api/latest/latest-response.model';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
    selector: 'viz-search-display',
    templateUrl: './search-display.component.html'
})
export class SearchDisplayComponent{
    constructor(
        private citiesService: CitiesService,
        private latestService: LatestService
      ) {};
      testMsg: string = "Hello - I am Home."
      allCities: CitiesResponseModel[] = [];
      filteredCities: Observable<CitiesResponseModel[]>;
      latestInfo: LatestResponseModel; 
      searchedCities: LatestResponseModel[] = [];
      cityCtrl: FormControl;
    
      ngOnInit() {
        this.cityCtrl = new FormControl();
        this.loadCities();
        this.filteredCities = this.cityCtrl.valueChanges
          .startWith(null)
          .map(city => city ? this.filterCities(city) : this.allCities.slice());
      }
    
      loadCities() {
        console.log('loadCities called');
        this.citiesService.getAllCities().subscribe(cities => {
            this.allCities = cities;
            console.log(this.allCities);
          });
      }
    
    loadLatest(city: string) {
      console.log('loadLatest called');
      this.latestService.getLatestPM25ByCity(city).subscribe(latest => {
        console.log(latest);
          this.searchedCities.push(latest[0])         
      });
    }

    filterCities(name: string) {
      return this.allCities.filter(city =>
        city.city.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    addToSearchedCities(event:any) {
      console.log('addToSearched called', this.cityCtrl.value);
      
      this.loadLatest(this.cityCtrl.value);
    }

    getClass(city: LatestResponseModel): string {
      let val = city && city.measurements && city.measurements[0] && city.measurements[0].value;
      if (!val) return 'black';
      if (val < 20) return 'green';
      if (val < 40) return 'orange';
      if (val < 70) return 'red';
      return 'dark-red';
    }
}