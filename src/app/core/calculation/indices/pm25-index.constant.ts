import { BaseIndex } from './base-index.model'; 

export const PM25_INDEX: BaseIndex = {
    parameter: 'pm25',
    unit: 'ug/m3',
    levels: {
        good: [0, 12.0],
        moderate: [12.1, 35.4],
        unhealthySensitive: [35.5, 55.4],
        unhealthy: [55.5, 150.4],
        veryUnhealthy: [150.5, 250.4],
        hazardous: [250.5, 500.4]
    }    
}