import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CityModule } from './city/city.module';
import { CoreModule } from './core/core.module';
import { APP_ROUTES } from './core/routing/routes.constant';
import { HomeModule } from './home/home.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { SearchModule } from './search/search.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(APP_ROUTES),
        ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
        CityModule,
        CoreModule,
        HomeModule,
        OnboardingModule,
        SearchModule,
        SettingsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
