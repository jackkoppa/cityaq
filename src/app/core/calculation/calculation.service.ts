// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { BaseIndex } from './indices/base-index.model';
import { AQI_LEVELS } from './indices/aqi-levels.constant';

import { PM25_INDEX } from './indices/parameters/pm25-index.constant';
import { PM10_INDEX } from './indices/parameters/pm10-index.constant';
import { O3_INDEX } from './indices/parameters/o3-index.constant';
import { CO_INDEX } from './indices/parameters/co-index.constant';
import { SO2_INDEX } from './indices/parameters/so2-index.constant';
import { NO2_INDEX } from './indices/parameters/no2-index.constant';

@Injectable()
export class CalculationService {
    constructor() {};

    public calculatePM25AQI(value: number): number {
        return this.calculateParameterAQI(value, PM25_INDEX, 1)
    }

    public calculatePM10AQI(value: number): number {
        return this.calculateParameterAQI(value, PM10_INDEX, 0)
    }

    public calculateO3AQI(value: number): number {
        return this.calculateParameterAQI(value, O3_INDEX, 3)
    }

    public calculateCOAQI(value: number): number {
        return this.calculateParameterAQI(value, CO_INDEX, 1)
    }

    public calculateSO2AQI(value: number): number {
        return this.calculateParameterAQI(value, SO2_INDEX, 0)
    }

    public calculateNO2AQI(value: number): number {
        return this.calculateParameterAQI(value, NO2_INDEX, 0)
    }

    private calculateParameterAQI(value: number, index: BaseIndex, decimal: number): number {
        const decimalVal = +value.toFixed(decimal);
        let calculatedAqi: number;
        Object.keys(index.levels).some(level => {
            const min = index.levels[level][0],
                max = index.levels[level][1],
                aqiMin = AQI_LEVELS[level][0],
                aqiMax = AQI_LEVELS[level][1];
            if (min <= decimalVal && decimalVal <= max) {
                calculatedAqi = this.linearCalculation(decimalVal, min, max, aqiMin, aqiMax);
                return true;
            }
        });
        return Math.round(calculatedAqi);
    }

    private linearCalculation(
        value: number,
        min: number,
        max: number,
        aqiMin: number,
        aqiMax: number
    ): number {
        return (value - min) * (aqiMax - aqiMin) / (max - min) + aqiMin;
    }
}