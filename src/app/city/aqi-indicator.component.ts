import { Component, OnInit, Input } from '@angular/core';

import { CalculationNamingService } from '../core/calculation/calculation-naming.service';
import { FadeAnimation } from '../shared/animations/fade-animation.constant';

import { ParameterAverage } from './individual-aqi.model';

@Component({
    selector: 'aq-aqi-indicator',
    templateUrl: './aqi-indicator.component.html',
    animations: [FadeAnimation]
})
export class AQIIndicatorComponent implements OnInit {
    @Input() AQI: number;
    @Input() overall: boolean = false;

    constructor(private calculationNamingService: CalculationNamingService) {}

    ngOnInit() {

    }

    get indicatorClass(): string {
        let indicatorClass = this.calculationNamingService.getAQIClassName(this.AQI);
        indicatorClass = 'bg-' + indicatorClass;
        return this.overall ? indicatorClass + ' overall' : indicatorClass;
    }
}