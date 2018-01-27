import { Routes } from '@angular/router';
import { SearchComponent } from '../../search/search.component';

export const APP_ROUTES: Routes = [
    { path: 'search', component: SearchComponent },
    { path: '',   redirectTo: '/search', pathMatch: 'full' },
    { path: '**',   redirectTo: '/search' }
]