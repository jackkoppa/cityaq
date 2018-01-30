import { 
    Component,
    Output,
    EventEmitter,
    HostListener,
    Renderer2,
    ElementRef
} from '@angular/core';

const VELOCITY_THRESHOLD: number = 0.15;
const DELETE_BUTTON_WIDTH: number = 75;
const DELAY_CORRECTION_PX: number = 20;

@Component({
    selector: 'aq-slide-delete',
    templateUrl: './slide-delete.component.html'
})
export class SlideDeleteComponent {
    public x: number = 0;
    private startX: number = 0;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { };

    public onPanStart(event: any): void {
        event.preventDefault();
        this.startX = this.x;
    }

    public onPan(event: any): void {
        event.preventDefault();
        if (this.aboveThreshold(event.velocityX)) {
            this.x = this.calculateNewX(event.deltaX);
            this.setX();
        }
    }

    public onPanEnd(event: any): void {
        event.preventDefault();
        if (this.newMovementExceedingButtonWidth())
            this.x = this.x >= 0 ? DELETE_BUTTON_WIDTH : DELETE_BUTTON_WIDTH * -1;
        else
            this.x = 0;
        this.setX();
    }

    private aboveThreshold(velocityX: number): boolean {
        return Math.abs(velocityX) >= VELOCITY_THRESHOLD
    }

    private calculateNewX(eventX: number): number {        
        const absX = Math.abs(eventX);
        const newAbsX = Math.round(Math.log(absX) / Math.log(1.05));
        const newX = (eventX >= 0 ? newAbsX : newAbsX * -1) + this.startX;
        return this.correctPosition(newX);
    }
    
    private setX(): void {
        this.renderer.setStyle(this.el.nativeElement, 'left', `${this.x}px`);
    }

    private newMovementExceedingButtonWidth(): boolean {
        return Math.abs(this.x) >= DELETE_BUTTON_WIDTH && this.startX === 0
    }

    private correctPosition(newX: number): number {
        if (this.startX === 0) return newX;
        const correction = this.startX >= 0 ? DELAY_CORRECTION_PX : DELAY_CORRECTION_PX * -1;
        const correctedX = newX - correction;
        const outOfBounds = this.startX >= 0 ? correctedX < 0 : correctedX > 0;
        return outOfBounds ? 0 : correctedX;
    }
}