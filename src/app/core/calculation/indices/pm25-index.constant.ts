import { BaseIndex } from './base-index.model'; 

export const PM25_INDEX: BaseIndex = {
    parameter: 'pm25',
    unit: 'ug/m3',
    good: {
        min: 0,
        max: 12.0
    },
    moderate: {
        min: 12.1,
        max: 35.4
    },
    unhealthySensitive: {
        min: 35.5,
        max: 55.4
    },
    unhealthy: {
        min: 55.5,
        max: 150.4
    },
    veryUnhealthy: {
        min: 150.5,
        max: 250.4
    },
    hazardous: {
        min: 250.5,
        max: 500.4
    }
}