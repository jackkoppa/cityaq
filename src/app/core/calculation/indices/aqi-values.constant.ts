import { BaseIndex } from './base-index.model'; 

export const AQI_VALUES: BaseIndex = {
    good: {
        min: 0,
        max: 50
    },
    moderate: {
        min: 51,
        max: 100
    },
    unhealthySensitive: {
        min: 101,
        max: 150
    },
    unhealthy: {
        min: 151,
        max: 200
    },
    veryUnhealthy: {
        min: 201,
        max: 300
    },
    hazardous: {
        min: 301,
        max: 500
    }
}