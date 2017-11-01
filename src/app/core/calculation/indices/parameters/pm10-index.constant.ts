// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf, p. 12
import { BaseIndex } from '../base-index.model'; 

export const PM10_INDEX: BaseIndex = {
    parameter: 'pm10',
    unit: 'µg/m³',
    hours: 24,
    levels: {
        good: [0, 54],
        moderate: [55, 154],
        unhealthySensitive: [155, 254],
        unhealthy: [255, 354],
        veryUnhealthy: [355, 424],
        hazardous1: [425, 504],
        hazardous2: [505, 604]
    }    
}