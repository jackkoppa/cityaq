import { Component } from '@angular/core';
import { CitiesResponseModel } from './api/openaq/cities/cities-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  response: CitiesResponseModel;
}
