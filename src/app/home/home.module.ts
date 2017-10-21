import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent],
    imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [HomeComponent]
})
export class HomeModule {}

