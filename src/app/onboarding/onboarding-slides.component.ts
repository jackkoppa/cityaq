import { Component, Input } from '@angular/core';

@Component({
    selector: 'aq-onboarding-slides',
    templateUrl: './onboarding-slides.component.html'
})
export class OnboardingSlidesComponent {
    @Input() backgroundOnly: boolean = false;
}