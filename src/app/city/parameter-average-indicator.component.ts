import { Component, OnInit, Input } from '@angular/core';

import { NamingService } from '../core/naming/naming.service';
import { FadeAnimation } from '../shared/animations/fade-animation.constant';

import { ParameterAverage } from './individual-aqi.model';

@Component({
    selector: 'aq-parameter-average-indicator',
    templateUrl: './parameter-average-indicator.component.html',
    animations: [FadeAnimation]
})
export class ParameterAverageIndicatorComponent implements OnInit {
    @Input() average: ParameterAverage;

    constructor(private namingService: NamingService) {}

    ngOnInit() {
        
    }
}