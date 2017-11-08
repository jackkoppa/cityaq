import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { CompareModule } from './compare/compare.module';
import { SearchModule } from './search/search.module';
import { CityModule } from './city/city.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        CoreModule,
        HomeModule,
        CompareModule,
        SearchModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
