// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
import { BaseIndex } from '../base-index.model'; 

export const CO_INDEX: BaseIndex = {
    parameter: 'co',
    unit: 'ppm',
    hours: 8,
    levels: {
        good: [0.0, 4.4],
        moderate: [4.5, 9.4],
        unhealthySensitive: [9.5, 12.4],
        unhealthy: [12.5, 15.4],
        veryUnhealthy: [15.5, 30.4],
        hazardous1: [30.5, 40.4],
        hazardous2: [40.5, 50.4]
    }    
}