// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { Levels } from './indices/levels.model';
import { LevelDescriptions } from './indices/level-descriptions.model';
import { AQI_LEVELS } from './indices/aqi-levels.constant';
import { ParametersModel } from '../api/openaq/parameters.model';

export type LevelName = keyof Levels;

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
}