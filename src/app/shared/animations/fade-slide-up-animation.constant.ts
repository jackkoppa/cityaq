import { trigger, transition, style, animate, AnimationTriggerMetadata } from '@angular/animations';

export const FadeSlideUpAnimation: AnimationTriggerMetadata = trigger(
    'fadeSlideUp',
    [
        transition(
            ':enter', 
            [
                style({transform: 'translateY(100%)', opacity: 0}),
                animate('300ms', style({transform: 'translateY(0)', 'opacity': 1}))
            ]
        ),
        transition(
            ':leave', 
            [
                style({transform: 'translateY(0)', 'opacity': 1}),
                animate('300ms', style({transform: 'translateY(100%)', 'opacity': 0}))              
            ]
        )
    ]
)