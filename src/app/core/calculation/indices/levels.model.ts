import { LevelBase } from './level-base.model';
import { Range } from './range.model';

export interface Level extends LevelBase {
    good: Range;
    moderate: Range;
    unhealthySensitive: Range;
    unhealthy: Range;
    veryUnhealthy: Range;
    hazardous1: Range;
    hazardous2: Range;
}  