import { Component } from '@angular/core';

const TRANSITION_TRANSFORM: string = 'transition-transform';
const TRANSITION_BG: string = 'transition-background-position';

const FOREGROUND_RATIO: number = 1.25;
const MIDGROUND_RATIO: number = 0.75;
const BACKGROUND_RATIO: number = 0.25;

@Component({
    selector: 'aq-onboarding',
    templateUrl: './onboarding.component.html'
})
export class OnboardingComponent {
    public carouselTransition: string = TRANSITION_TRANSFORM;
    public skylineTransition: string = TRANSITION_BG;
    public x: number = 0;
    
    private carouselStartX: number = 0;

    public get carouselX(): string {
        return `translateX(${this.x}px)`
    };

    public get skylineForegroundX(): number {
        return this.x * FOREGROUND_RATIO;
    }

    public get skylineMidgroundX(): number {
        return this.x * MIDGROUND_RATIO;
    }

    public get skylineBackgroundX(): number {
        return this.x * BACKGROUND_RATIO;
    }

    constructor() { }

    public onPanStart(event: any): void {
        event.preventDefault();
        this.carouselTransition = this.skylineTransition = '';
        this.carouselStartX = this.x;
    }

    public onPan(event: any): void {
        event.preventDefault();
        this.x = event.deltaX + this.carouselStartX;
    }

    public onPanEnd(event: any): void {
        event.preventDefault();
        this.carouselTransition = TRANSITION_TRANSFORM;
        this.skylineTransition = TRANSITION_BG;
        this.calculateEndX();
    }

    private calculateEndX(): void {
        if (this.x > 0) this.x = 0;
    }
}