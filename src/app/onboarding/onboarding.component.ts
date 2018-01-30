import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

const TRANSITION_TRANSFORM: string = 'transition-transform';
const SLIDE_COUNT: number = 2;
const FOREGROUND_RATIO: number = 1.25;
const MIDGROUND_RATIO: number = 0.75;
const BACKGROUND_RATIO: number = 0.25;

@Component({
    selector: 'aq-onboarding',
    templateUrl: './onboarding.component.html'
})
export class OnboardingComponent implements AfterViewInit {
    @ViewChild('carousel') carousel: ElementRef;
    carouselElement: HTMLDivElement;
    public carouselTransition: string = TRANSITION_TRANSFORM;
    public skylineTransition: string = TRANSITION_TRANSFORM;
    public x: number = 0;
    
    private slideWidth: number = 0;    
    private currentSlidePosition: number = 0;
    private carouselStartX: number = 0;

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

    constructor() { }

    public ngAfterViewInit(): void {
        this.carouselElement = this.carousel && this.carousel.nativeElement;
    }

    public onPanStart(event: any): void {
        event.preventDefault();
        this.slideWidth = this.carouselElement && (this.carouselElement.offsetWidth / SLIDE_COUNT) || 0;
        this.carouselTransition = this.skylineTransition = '';
        this.carouselStartX = this.x;
        this.currentSlidePosition = Math.ceil(this.carouselStartX / this.slideWidth * -1)
    }

    public onPan(event: any): void {
        event.preventDefault();
        this.x = event.deltaX + this.carouselStartX;
    }

    public onPanEnd(event: any): void {
        event.preventDefault();
        this.carouselTransition = this.skylineTransition = TRANSITION_TRANSFORM;
        this.x = this.calculateEndX();
        //console.log(this.x, this.currentSlidePosition, this.slideWidth, this.carouselStartX);
    }

    private pxToTranslateX(pixels: number): string {
        return `translateX(${pixels}px)`
    }

    private calculateEndX(): number {
        console.log(this.x, this.currentSlidePosition, this.slideWidth)
        let endX: number = 0
        
        console.log(((this.currentSlidePosition - 1) * this.slideWidth * -1) - (this.slideWidth / 2));
        console.log(((this.currentSlidePosition + 1) * this.slideWidth * -1) - (this.slideWidth / 2));

        

        if (this.x >= ((this.currentSlidePosition - 1) * this.slideWidth * -1) - (this.slideWidth / 2))
            endX = (this.currentSlidePosition - 1) * this.slideWidth * -1;
        else if (this.x < ((this.currentSlidePosition - 1) * this.slideWidth * -1) - (this.slideWidth / 2) && 
            this.x >= ((this.currentSlidePosition) * this.slideWidth * -1) - (this.slideWidth / 2)) 
            endX = this.currentSlidePosition * this.slideWidth * -1;
        else 
            endX = (this.currentSlidePosition + 1) * this.slideWidth * -1;

        console.log(`endX: ${endX}`)

        if (endX > 0) return 0;
        if (endX < this.slideWidth * (SLIDE_COUNT - 1) * -1) return this.slideWidth * (SLIDE_COUNT - 1) * -1;
        return endX;
    }
}