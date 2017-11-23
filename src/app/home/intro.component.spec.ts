import { IntroComponent } from './intro.component';
import { DebugElement, NO_ERRORS_SCHEMA }    from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';

describe('IntroComponent', () => {
    let fixture: ComponentFixture<IntroComponent>;
    let introComponent: IntroComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [IntroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(IntroComponent);
        introComponent = fixture.componentInstance;
        fixture.detectChanges(); 
    });
    
    describe('constructor', () => {
        it('should initialize the component', () => {
            expect(introComponent).toBeTruthy();
        });

        it('should populate the h1 tag correctly', () => {
            let h1Debug: DebugElement = fixture.debugElement.query(By.css('h1'));
            let h1: HTMLElement = h1Debug.nativeElement;   
            expect(h1.textContent).toContain('Welcome to cityAQ');
        });

        it('should populate the h3 tag correctly', () => {
            let h3Debug: DebugElement = fixture.debugElement.query(By.css('h3'));
            let h3: HTMLElement = h3Debug.nativeElement;   
            expect(h3.textContent).toContain('Compare air quality for cities by searching below');
        });

        it('should have the correct source for the svg image', () => {
            let imgDebug: DebugElement = fixture.debugElement.query(By.css('img'));
            let img: HTMLImageElement = imgDebug.nativeElement;
            expect(img.src).toBe('http://localhost:9876/assets/icons/cityAQ.svg');
        })
    });
});