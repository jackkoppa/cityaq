// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
import { BaseIndex } from '../base-index.model'; 

export const O3_INDEX: BaseIndex = {
    parameter: 'o3',
    unit: 'ppm',
    hours: 8,
    decimalPlaces: 3,
    levels: {
        good: [0, 0.054],
        moderate: [0.055, 0.070],
        unhealthySensitive: [0.071, 0.085],
        unhealthy: [0.086, 0.105],
        veryUnhealthy: [0.106, 0.200],
        // TODO: EPA specifically states that beyond 300 AQI for O3, 1-hour concentrations should be used
        // currently not setup to handle multiple concentration periods; 
        // consider changing implementation to do so
        hazardous1: [null, null],
        hazardous2: [null, null]
    }    
}