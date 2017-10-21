import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
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
    HttpModule,
    HomeModule,
    HandlersModule
  ],
  providers: [CitiesApi],
  bootstrap: [AppComponent]
})
export class AppModule { }
