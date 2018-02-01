import { OnboardingComponent } from './onboarding.component';

import { DebugElement, NO_ERRORS_SCHEMA }    from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GesturesModule } from '../shared/gestures/gestures.module';

describe('IntroComponent', () => {
    let fixture: ComponentFixture<OnboardingComponent>;
    let onboardingComponent: OnboardingComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OnboardingComponent],
            schemas: [NO_ERRORS_SCHEMA],
            // more of an integration than unit test; Hammerjs is required by OnboardingComponent, with the config in GesturesModule
            // BrowserAnimationsModule required for @fade properties
            imports: [GesturesModule, BrowserAnimationsModule] 
        });
        fixture = TestBed.createComponent(OnboardingComponent);
        onboardingComponent = fixture.componentInstance;
        fixture.detectChanges(); 
    });
    
    describe('constructor', () => {
        it('should initialize the component', () => {
            expect(onboardingComponent).toBeTruthy();
        });

        describe('given a list of divs with class "skyline"', () => {
            let divsDebug: DebugElement[];
            beforeEach(() => divsDebug = fixture.debugElement.queryAll(By.css('.skyline')));

            let testCases: string[] = ['skyline-foreground', 'skyline-midground', 'skyline-background'];

            testCases.forEach(className => {
                it(`should have a div with class "${className}"`, () => {
                    let div: HTMLElement = divsDebug.find(divDebug => divDebug.nativeElement.classList.contains(className)).nativeElement;
                    expect(div).toBeTruthy();
                });
            });
        });
    });
});