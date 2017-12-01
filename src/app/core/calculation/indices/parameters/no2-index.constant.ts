// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
import { BaseIndex } from '../base-index.model'; 

export const NO2_INDEX: BaseIndex = {
    parameter: 'no2',
    unit: 'ppb',
    hours: 1,
    decimalPlaces: 0,
    levels: {
        good: [0, 53],
        moderate: [54, 100],
        unhealthySensitive: [101, 360],
        unhealthy: [361, 649],
        veryUnhealthy: [650, 1249],
        hazardous1: [1250, 1649],
        hazardous2: [1650, 2049]
    }    
}