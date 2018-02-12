import { Component } from '@angular/core';

import { AQI_LEVELS }  from '../core/calculation/indices/aqi-levels.constant';
import { Range } from '../core/calculation/indices/range.model';
import { ColorName } from '../core/naming/color-name.model';
import { LEVEL_CLASS_NAMES } from '../core/naming/level-class-names.constant';
import { LEVEL_DESCRIPTIONS } from '../core/naming/level-descriptions.constant';
import { Level } from '../core/calculation/indices/level.model';

interface AQIOption {
    level: string;
    range: Range;
    className: ColorName;
    description: string; 
}

@Component({
    selector: 'aq-onboarding-slide-three',
    templateUrl: './onboarding-slide-three.component.html'
})
export class OnboardingSlideThreeComponent {
    private AQILevels = AQI_LEVELS;
    private levelClassNames = LEVEL_CLASS_NAMES;
    private levelDescriptions = LEVEL_DESCRIPTIONS;

    public AQIOptions: AQIOption[];

    constructor() {
        this.AQIOptions = Object.keys(this.combineHazardous(this.AQILevels)).map(level => {
            return <AQIOption>{
                level: level,
                range: this.AQILevels[level],
                className: this.levelClassNames[level],
                description: this.levelDescriptions[level]
            }
        })
    }

    private combineHazardous(level: Level): Level {
        const newLevel = Object.assign({}, level);
        newLevel.hazardous1[1] = level.hazardous2[1];
        delete newLevel.hazardous2;
        return newLevel;
    }
}