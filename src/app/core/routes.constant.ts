import { Routes } from "@angular/router";
import { CompareComponent } from "../compare/compare.component";

export const APP_ROUTES: Routes = [
    { path: 'compare', component: CompareComponent },
    { path: '',   redirectTo: '/compare', pathMatch: 'full' },
    { path: '**',   redirectTo: '/compare' }
]