import { Level } from './levels.model'; 

export const AQI_LEVELS: Level = {
    good: [0, 50],
    moderate: [51, 100],
    unhealthySensitive: [101, 150],
    unhealthy: [151, 200],
    veryUnhealthy: [201, 300],
    hazardous1: [301, 400],
    hazardous2: [401, 500]
}