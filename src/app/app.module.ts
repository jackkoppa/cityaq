import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material/material.module';
import { HomeModule } from './home/home.module';
import { SearchDisplayModule } from './search-display/search-display.module';
import { HandlersModule } from './handlers/handlers.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ApiModule,
    SearchDisplayModule,
    HomeModule,
    HandlersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
