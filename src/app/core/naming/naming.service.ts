// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { AQI_LEVELS } from '../calculation/indices/aqi-levels.constant';
import { Parameter } from '../api/openaq/parameter.model';

import { Level } from '../calculation/indices/level.model';
import { LEVEL_DESCRIPTIONS } from './level-descriptions.constant';
import { LEVEL_CLASS_NAMES } from './level-class-names.constant';

export type LevelName = keyof Level;

@Injectable()
export class NamingService {
    constructor() {};

    public getAQIClassName(AQI: number): string {
        const roundedAQI = Math.round(AQI);
        let className: string;
        Object.keys(AQI_LEVELS).some(level => {
            if(AQI_LEVELS[level][0] <= roundedAQI && roundedAQI <= AQI_LEVELS[level][1]) {
                className = LEVEL_CLASS_NAMES[level];
                return true;
            }
        });
        return className || 'unknown';
    }

    public getLevelDescription(level: LevelName): string {
        if (LEVEL_DESCRIPTIONS.hasOwnProperty(level)) {
            return LEVEL_DESCRIPTIONS[level];
        } else {
            return 'Unknown';
        }
    }
}