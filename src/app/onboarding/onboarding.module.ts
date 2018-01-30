import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { OnboardingComponent } from './onboarding.component';
import { OnboardingSlideOneComponent } from './onboarding-slide-one.component';
import { OnboardingSlideTwoComponent } from './onboarding-slide-two.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        OnboardingComponent,
        OnboardingSlideOneComponent,
        OnboardingSlideTwoComponent
    ],
    exports: [OnboardingComponent]
})
export class OnboardingModule {}