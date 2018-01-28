import { 
    Directive,
    Input,
    Output,
    EventEmitter,
    HostListener,
    Renderer2,
    ElementRef
} from '@angular/core';

const VELOCITY_THRESHOLD: number = 0.2;

@Directive({
    selector: '[aqSwipeDelete]'
})
export class SwipeDeleteDirective {
    private x: number = 0;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { }

    @HostListener('panright', ['$event'])
    @HostListener('panleft', ['$event'])
    private onPan(event: any): void {
        event.preventDefault();
        console.log(event.deltaX, event.velocityX, event.angle, event.direction)
        if (Math.abs(event.velocityX) >= VELOCITY_THRESHOLD) {
            this.x = this.calculateNewX(event.deltaX);
            this.setX();
        }
    }

    @HostListener('panend', ['$event'])
    @HostListener('pancancel', ['$event'])
    private onPanEnd(event: any): void {
        this.x = 0;
        this.setX();
    }

    private calculateNewX(eventX: number): number {
        const absX = Math.abs(eventX);
        const newX = Math.round(Math.log(absX) / Math.log(1.05));
        return eventX > 0 ? newX : newX * -1;
    }
    
    private setX(): void {
        this.renderer.setStyle(this.el.nativeElement, 'left', `${this.x}px`);
    }
}