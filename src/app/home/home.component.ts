import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FadeAnimation } from '../shared/animations/fade-animation.constant';
import { SearchService } from '../search/search.service';
import { SearchingStatus } from '../search/searching-status.model';
import { QueryParams } from '../core/routing/params.models';

@Component({
    selector: 'aq-home',
    templateUrl: './home.component.html',
    animations: [FadeAnimation]
})
export class HomeComponent {
    userOnboarded: boolean = false;
    
    constructor(
        private route: ActivatedRoute,
        private searchService: SearchService
    ) { 
        this.route.queryParams.subscribe(queryParams => {
            if (queryParams.cities && queryParams.cities.length > 0) this.userOnboarded = true;
        })
        this.searchService.searchingStatus.subscribe(status => {
            if (status === SearchingStatus.Focused) this.userOnboarded = true;
        });
    };
}