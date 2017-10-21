import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HomeModule } from './home/home.module';
import { HandlersModule } from './handlers/handlers.module';
import { AppComponent } from './app.component';
import { CitiesApi } from './api/openaq/cities/cities.api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HandlersModule,
    HttpModule
  ],
  providers: [CitiesApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
