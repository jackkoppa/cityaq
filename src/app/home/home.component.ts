import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../handlers/cities.service';
import { CitiesResponseModel } from '../api/openaq/cities/cities-response.model';

@Component({
  selector: 'viz-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  constructor(private citiesService: CitiesService) {};
  testMsg: string = "Hello - I am Home."
  allCities: CitiesResponseModel[];

  ngOnInit() {
    
  }

  loadCities() {
    console.log('loadCities called');
    this.citiesService.getAllCities().subscribe(cities => {
        this.allCities = cities;
        console.log(this.allCities);
      });
  }

}