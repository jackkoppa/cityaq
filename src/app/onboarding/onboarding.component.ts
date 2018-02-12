import { Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';

import { FadeAnimation } from '../shared/animations/fade-animation.constant';

const SLIDE_COUNT: number = 4;
const TRANSITION_TRANSFORM: string = 'transition-transform';
const MOMENTUM_MULTIPLIER: number = 100; // this * px/ms, gives additional "momentum" at end of pan
const MOMENTUM_THRESHOLD: number = 1.05; // if velocity on last pan event is greater, will automatically move to targeted slide

const FOREGROUND_RATIO: number = 1.25;
const MIDGROUND_RATIO: number = 0.75;
const BACKGROUND_RATIO: number = 0.25;

@Component({
    selector: 'aq-onboarding',
    templateUrl: './onboarding.component.html',
    animations: [FadeAnimation]
})
export class OnboardingComponent implements AfterContentInit {
    @ViewChild('carousel') carousel: ElementRef;
    carouselElement: HTMLDivElement;
    public carouselTransition: string = TRANSITION_TRANSFORM;
    public skylineTransition: string = TRANSITION_TRANSFORM;
    public x: number = 0;

    private slideWidth: number = 0;    
    private currentSlidePosition: number = 0;
    private carouselStartX: number = 0;
    private allVelocities: number[] = [];
    private endVelocity: number = 0;

    public get carouselX(): string {
        return this.pxToTranslateX(this.x)
    };

    public get skylineForegroundX(): string {
        return this.pxToTranslateX(this.x * FOREGROUND_RATIO);
    }

    public get skylineMidgroundX(): string {
        return this.pxToTranslateX(this.x * MIDGROUND_RATIO);
    }

    public get skylineBackgroundX(): string {
        return this.pxToTranslateX(this.x * BACKGROUND_RATIO);
    }

    public get hasPreviousSlide(): boolean {
        return this.carouselStartX <= this.slideWidth * -1;
    }

    public get hasNextSlide(): boolean {
        return this.carouselStartX > this.slideWidth * (SLIDE_COUNT - 1) * -1;
    }

    constructor() { }

    public ngAfterContentInit(): void {
        this.carouselElement = this.carousel && this.carousel.nativeElement;
        this.resetMeasurements();
    }

    public onPanStart(event: any): void {
        event.preventDefault();        
        this.carouselTransition = this.skylineTransition = '';
        this.resetMeasurements();
    }

    public onPan(event: any): void {
        event.preventDefault();
        this.x = event.deltaX + this.carouselStartX;
        this.allVelocities.push(event.velocityX);      
    }

    public onPanEnd(event: any): void {
        event.preventDefault();
        this.endVelocity = event.velocityX;
        this.carouselTransition = this.skylineTransition = TRANSITION_TRANSFORM;        
        this.x = this.calculateXAfterMomentum();
        this.x = this.calculateEndX();
        this.resetMeasurements();
    }

    public goToPreviousSlide(): void {
        this.x = this.getCoordBySlidePosition(-1);
        this.resetMeasurements();
    }

    public goToNextSlide(): void {
        this.x = this.getCoordBySlidePosition(1);
        this.resetMeasurements();
    }

    private pxToTranslateX(pixels: number): string {
        return `translateX(${pixels}px)`
    }

    private resetMeasurements(): void {
        this.slideWidth = this.carouselElement && (this.carouselElement.offsetWidth / SLIDE_COUNT) || 0;
        this.carouselStartX = this.x;
        this.allVelocities = [];
        this.currentSlidePosition = Math.ceil(this.carouselStartX / this.slideWidth * -1);
    }

    private calculateXAfterMomentum(): number {
        // use largest velocity achieved during this pan event, that matched direction of final velocity
        const maxVelocity = Math.max(...this.allVelocities);
        const minVelocity = Math.min(...this.allVelocities);
        const calcPanVelocity = this.endVelocity >= 0 ? maxVelocity : minVelocity;
        const calcFinalVelocity = Math.abs(calcPanVelocity) >= Math.abs(this.endVelocity) ? calcPanVelocity : this.endVelocity;
        
        if (Math.abs(calcFinalVelocity) >= MOMENTUM_THRESHOLD)
            return calcFinalVelocity >= 0 ? this.getCoordBySlidePosition(-1) : this.getCoordBySlidePosition(1);

        return this.x + (this.endVelocity * MOMENTUM_MULTIPLIER);
    }

    private calculateEndX(): number {
        let endX: number = 0        

        if (this.targetPreviousSlide())
            endX = this.getCoordBySlidePosition(-1);
        else if (this.targetThisSlide()) 
            endX = this.getCoordBySlidePosition(0);
        else 
            endX = this.getCoordBySlidePosition(1);

        if (endX > 0) return 0;
        if (endX < this.slideWidth * (SLIDE_COUNT - 1) * -1) return this.slideWidth * (SLIDE_COUNT - 1) * -1;
        return endX;
    }

    private targetPreviousSlide(): boolean {
        return this.x >= this.getTargetBySlidePosition(-1);
    }
    
    private targetThisSlide(): boolean {
        return this.x < this.getTargetBySlidePosition(-1) && 
            this.x >= this.getTargetBySlidePosition(0)
    }
    
    private getCoordBySlidePosition(slidePosition: number): number {
        return  (this.currentSlidePosition + slidePosition) * this.slideWidth * -1
    }

    private getTargetBySlidePosition(slidePositionTarget: number): number {
        return ((this.currentSlidePosition + slidePositionTarget) * this.slideWidth * -1) - (this.slideWidth / 2)
    }

}