import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SearchDisplayModule } from './search-display/search-display.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        CoreModule,
        HomeModule,
        SearchDisplayModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
