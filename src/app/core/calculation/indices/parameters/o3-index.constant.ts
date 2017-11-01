// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
// note: also offers 1 hour exposure guidelines for o3, not implemented here
import { BaseIndex } from '../base-index.model'; 

export const O3_INDEX: BaseIndex = {
    parameter: 'o3',
    unit: 'ppm',
    hours: 8,
    levels: {
        good: [0, 0.054],
        moderate: [0.055, 0.070],
        unhealthySensitive: [0.071, 0.085],
        unhealthy: [0.086, 0.105],
        veryUnhealthy: [0.106, 0.200],
        hazardous1: null,
        hazardous2: null
    }    
}