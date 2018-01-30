import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FadeAnimation } from '../shared/animations/fade-animation.constant';
import { SearchService } from '../search/search.service';
import { SearchingStatus } from '../search/searching-status.model';

@Component({
    selector: 'aq-home',
    templateUrl: './home.component.html',
    animations: [FadeAnimation]
})
export class HomeComponent {
    userOnboarded: boolean = false;
    
    constructor(
        private searchService: SearchService
    ) { 
        this.searchService.searchingStatus.subscribe(status => {
            if (status === SearchingStatus.Focused) this.userOnboarded = true;
        });
    };
}