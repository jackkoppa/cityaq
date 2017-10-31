// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { AQI_VALUES } from './indices/aqi-values.constant';
import { PM25_INDEX } from './indices/pm25-index.constant';

@Injectable()
export class CalculationService {
    constructor() {};

    calculatePM25AQI(value: number) {
        
    }
}