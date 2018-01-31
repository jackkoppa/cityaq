import { Component, Input } from '@angular/core';

@Component({
    selector: 'aq-onboarding-slide-three',
    templateUrl: './onboarding-slide-three.component.html'
})
export class OnboardingSlideThreeComponent {
    @Input() backgroundOnly: boolean = false;
}