// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { Parameter } from '../api/openaq/parameter.model';
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

    public calculateAQIByParameter(value: number, parameter: Parameter): number {
        let result: number;
        switch(parameter) {
            case 'pm25':
                result = this.calculatePM25AQI(value);
                break;
            case 'pm10':
                result = this.calculatePM10AQI(value);
                break;
            case 'o3':
                result = this.calculateO3AQI(value);
                break;
            case 'co':
                result = this.calculateCOAQI(value);
                break;
            case 'so2':
                result = this.calculateSO2AQI(value);
                break;
            case 'no2':
                result = this.calculateNO2AQI(value);
                break;
            default:
                throw new Error('invalid parameter given for AQI calculation');            
        }
        return result;
    }

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
        const truncatedVal = this.truncateAtDecimal(value, decimal);
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
            return this.handleUnmatchedLevel(truncatedVal, index, decimal);
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
        if (value >= index.levels.hazardous2[1]) // if greater than greatest measurement, return highest AQI (500)
            return AQI_LEVELS.hazardous2[1];
        if (value <= 0) // if less than or equal to 0, return lowest AQI (0)
            return AQI_LEVELS.good[0];
        throw new Error(`Failed to calculate AQI for ${index.parameter} parameter,` + 
            `with value of ${value} ${index.unit}`)
    }
}