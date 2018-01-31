import { Component, Input } from '@angular/core';

@Component({
    selector: 'aq-onboarding-slide-one',
    templateUrl: './onboarding-slide-one.component.html'
})
export class OnboardingSlideOneComponent {
    @Input() backgroundOnly: boolean = false;
}