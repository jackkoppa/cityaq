// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { AQI_VALUES } from './indices/aqi-values.constant';
import { PM25_INDEX } from './indices/pm25-index.constant';

@Injectable()
export class CalculationService {
    constructor() {};

    calculatePM25AQI(value: number): number {
        const decimalVal = +value.toFixed(1);
        const levels = PM25_INDEX.levels;
        const aqiLevels = AQI_VALUES.levels;
        let calculatedAqi: number;
        Object.keys(levels).some(level => {
            const min = levels[level][0],
                max = levels[level][1],
                aqiMin = aqiLevels[level][0],
                aqiMax = aqiLevels[level][1];
            if (min <= decimalVal && decimalVal <= max) {
                calculatedAqi = (decimalVal - min) * (aqiMax - aqiMin) / (max - min) + aqiMin;
                return true;
            }
        });
        return Math.round(calculatedAqi);
    }
}