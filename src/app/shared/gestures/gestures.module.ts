import { NgModule } from '@angular/core';
import {
    HammerGestureConfig,
    HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';

import 'hammerjs';

import { SwipeDeleteDirective } from './swipe-delete.directive';

declare var Hammer: any;
  
export class MyHammerConfig extends HammerGestureConfig  {
    buildHammer(element: HTMLElement) {
        let mc = new Hammer(element, {
            touchAction: "pan-y"
        });
        return mc;
    }
}

@NgModule({
    exports: [SwipeDeleteDirective],
    declarations: [SwipeDeleteDirective],
    providers: [{
        // hammer instantion with custom config
        provide: HAMMER_GESTURE_CONFIG,
        useClass: MyHammerConfig ,
    }]
})
export class GesturesModule {}
