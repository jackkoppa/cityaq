import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OnboardingComponent } from './onboarding.component';

import { OnboardingSlideOneComponent } from './onboarding-slide-one.component';
import { OnboardingSlidesComponent } from './onboarding-slides.component';
import { OnboardingSlideTwoComponent } from './onboarding-slide-two.component';
import { OnboardingSlideThreeComponent } from './onboarding-slide-three.component';
import { OnboardingSlideFourComponent } from './onboarding-slide-four.component';
import { OnboardingSlideFiveComponent } from './onboarding-slide-five.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        OnboardingComponent,
        OnboardingSlidesComponent,
        OnboardingSlideOneComponent,
        OnboardingSlideTwoComponent,
        OnboardingSlideThreeComponent,
        OnboardingSlideFourComponent,
        OnboardingSlideFiveComponent
    ],
    exports: [OnboardingComponent]
})
export class OnboardingModule {}