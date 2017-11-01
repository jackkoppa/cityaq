// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
import { BaseIndex } from '../base-index.model'; 

export const SO2_INDEX: BaseIndex = {
    parameter: 'so2',
    unit: 'ppb',
    hours: 1,
    levels: {
        good: [0, 35],
        moderate: [36, 75],
        unhealthySensitive: [76, 185],
        unhealthy: [186, 304],
        veryUnhealthy: [305, 604],
        hazardous1: [605, 804],
        hazardous2: [805, 1004]
    }    
}