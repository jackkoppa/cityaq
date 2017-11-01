import { Range } from './range.model';

export interface Levels {
    good: Range;
    moderate: Range;
    unhealthySensitive: Range;
    unhealthy: Range;
    veryUnhealthy: Range;
    hazardous1: Range;
    hazardous2: Range;
}  