import { Component, Input } from '@angular/core';

@Component({
    selector: 'aq-onboarding-slide-two',
    templateUrl: './onboarding-slide-two.component.html'
})
export class OnboardingSlideTwoComponent {
    @Input() backgroundOnly: boolean = false;
}