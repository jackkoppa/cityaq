// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { Levels } from './indices/levels.model';
import { LevelDescriptions } from './indices/level-descriptions.model';

export type LevelName = keyof Levels;

@Injectable()
export class CalculationNamingService {
    constructor() {};
    
    public getLevelDescription(level: LevelName): LevelDescriptions {
        let description: LevelDescriptions;
        switch(level) {
            case 'good':
                description = 'Good';
                break;
            case 'moderate':
                description = 'Moderate';
                break;
            case 'unhealthySensitive':
                description = 'Unhealthy for Sensitive Groups';
                break;
            case 'unhealthy':
                description = 'Unhealthy';
                break;
            case 'veryUnhealthy':
                description = 'Very Unhealthy';
                break;
            case 'hazardous1':
            case 'hazardous2':
                description = 'Hazardous';
                break;
            default:
                description = 'Unknown';
        }
        return description;
    }
}