import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SlideOutAnimation } from '../shared/animations/slide-out-animation.constant';

@Component({
    selector: 'aq-home',
    templateUrl: './home.component.html',
    animations: [SlideOutAnimation]
})
export class HomeComponent {
    userOnboarded: boolean = false;
    
    constructor(
        private router: ActivatedRoute
    ) { 
       
    };
}