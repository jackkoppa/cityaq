import { LevelBase } from '../calculation/indices/level-base.model';
import { ColorName } from './color-name.model';

export const LEVEL_CLASS_NAMES: LevelBase<ColorName> = {
    good: 'green',
    moderate: 'yellow',
    unhealthySensitive: 'orange',
    unhealthy: 'red',
    veryUnhealthy: 'purple',
    hazardous1: 'maroon',
    hazardous2: 'maroon',
}