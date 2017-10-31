import { BaseIndex } from './base-index.model'; 

export const AQI_VALUES: BaseIndex = {
    levels: {
        good: [0, 50],
        moderate: [51, 100],
        unhealthySensitive: [101, 150],
        unhealthy: [151, 200],
        veryUnhealthy: [201, 300],
        hazardous: [301, 500]
    }    
}