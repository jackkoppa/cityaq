// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
import { BaseIndex } from '../base-index.model'; 

export const O3_INDEX: BaseIndex = {
    unit: 'ppm',
    decimalPlaces: 3,
    averagingPeriodLevels: [{
        averagingPeriod: {
            value: 8,
            unit: 'hours'
        },
        levels: {
            good: [0, 0.054],
            moderate: [0.055, 0.070],
            unhealthySensitive: [0.071, 0.085],
            unhealthy: [0.086, 0.105],
            veryUnhealthy: [0.106, 0.200],
            hazardous1: null,
            hazardous2: null
        } 
    }, {
        averagingPeriod: {
            value: 1,
            unit: 'hours'
        },
        levels: {
            good: null,
            moderate: null,
            unhealthySensitive: [0.125, 0.164],
            unhealthy: [0.165, 0.204],
            veryUnhealthy: [0.205, 0.404],
            hazardous1: [0.405, 0.504],
            hazardous2: [0.505, 0.604]
        }
    }]
       
}