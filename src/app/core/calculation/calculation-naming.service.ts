// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { Level } from './indices/levels.model';
import { LEVEL_DESCRIPTIONS } from './indices/level-descriptions.constant';
import { AQI_LEVELS } from './indices/aqi-levels.constant';
import { ParametersModel } from '../api/openaq/parameters.model';

export type LevelName = keyof Level;

@Injectable()
export class CalculationNamingService {
    constructor() {};

    public getAQIClassName(aqi: number): string {
        let className: string
        if (aqi < AQI_LEVELS.good[1])
            className = 'green';
        else if (aqi < AQI_LEVELS.moderate[1])
            className = 'yellow';
        else if (aqi < AQI_LEVELS.unhealthySensitive[1])
            className = 'orange';
        else if (aqi < AQI_LEVELS.unhealthy[1])
            className = 'red';
        else if (aqi < AQI_LEVELS.veryUnhealthy[1])
            className = 'purple';
        else if (aqi <= AQI_LEVELS.hazardous2[1])
            className = 'maroon';
        else 
            className = 'unknown';
        return className;
    }

    public getLevelDescription(level: LevelName): string {
        if (LEVEL_DESCRIPTIONS.hasOwnProperty(level)) {
            return LEVEL_DESCRIPTIONS[level];
        } else {
            return 'Unknown';
        }
    }
}