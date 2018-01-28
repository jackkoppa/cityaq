import { 
    Component,
    OnInit,
    Output,
    EventEmitter,
    HostListener,
    Renderer2,
    ElementRef
} from '@angular/core';

const VELOCITY_THRESHOLD: number = 0.2;
const DELETE_BUTTON_WIDTH: number = 75;

@Component({
    selector: 'aq-slide-delete',
    templateUrl: './slide-delete.component.html'
})
export class SlideDeleteComponent implements OnInit {
    public x: number = 0;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) { };

    public ngOnInit(): void {
        
    }

    onPan(event: any): void {
        event.preventDefault();
        console.log(event.deltaX, event.velocityX, event.angle, event.direction)
        if (Math.abs(event.velocityX) >= VELOCITY_THRESHOLD) {
            this.x = this.calculateNewX(event.deltaX);
            this.setX();
        }
    }

    onPanEnd(event: any): void {
        event.preventDefault();
        this.x = this.x >= DELETE_BUTTON_WIDTH ? DELETE_BUTTON_WIDTH : 0;
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