import { trigger, transition, style, animate, state, AnimationTriggerMetadata } from '@angular/animations';

export const SlideOutAnimation: AnimationTriggerMetadata = trigger(
    'slideOut',
    [
        transition(
            ':leave', 
            [
                style({transform: 'translateY(0)'}),
                animate('500ms', style({transform: 'translateY(-150%)'}))              
            ]
        )
    ]
)