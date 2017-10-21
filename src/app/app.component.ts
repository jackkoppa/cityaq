import { Component } from '@angular/core';
import { CitiesResponseModel } from './api/openaq/cities-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  response: CitiesResponseModel;
}
