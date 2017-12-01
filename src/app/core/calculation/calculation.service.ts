// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { Parameter } from '../api/openaq/parameter.model';
import { BaseIndex } from './indices/base-index.model';
import { AQI_LEVELS } from './indices/aqi-levels.constant';

import { PARAMETER_INDEX_MAP } from './indices/parameters/parameter-index-map.constant';

@Injectable()
export class CalculationService {
    constructor() {};

    public calculateAQIByParameter(value: number, parameter: Parameter): number {
        const index = PARAMETER_INDEX_MAP[parameter];
        // TODO: better solution to identify 'bc', which does not have an EPA index
        if (index === null) return null;
        if (index === undefined) throw new Error('invalid parameter given for AQI calculation');
        
        return this.calculateAQIByIndex(value, index);
    }

    private calculateAQIByIndex(value: number, index: BaseIndex): number {
        const truncatedVal = this.truncateAtDecimal(value, index.decimalPlaces);
        let calculatedAqi: number;
        let foundMatching = Object.keys(index.levels).some(level => {
            const min = index.levels[level][0],
                max = index.levels[level][1],
                aqiMin = AQI_LEVELS[level][0],
                aqiMax = AQI_LEVELS[level][1];
            if (min <= truncatedVal && truncatedVal <= max) {
                calculatedAqi = this.linearCalculation(truncatedVal, min, max, aqiMin, aqiMax);
                return true;
            }
        });
        if (!foundMatching)
            return this.handleUnmatchedLevel(truncatedVal, index, index.decimalPlaces);
        return Math.round(calculatedAqi);
    }

    private truncateAtDecimal(value: number, decimal: number): number {
        return +(Math.floor(value * (Math.pow(10, decimal))) / Math.pow(10, decimal)).toFixed(decimal);
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

    private handleUnmatchedLevel(value: number, index: BaseIndex, decimal: number): number {
        // TODO: improve handling of edge cases
        if (value >= index.levels.hazardous2[1]) // if greater than greatest measurement, return highest AQI (500)
            return AQI_LEVELS.hazardous2[1];
        if (value <= 0) // if less than or equal to 0, return lowest AQI (0)
            return AQI_LEVELS.good[0];
        throw new Error(`Failed to calculate AQI for ${index.parameter} parameter,` + 
            `with value of ${value} ${index.unit}`)
    }
}