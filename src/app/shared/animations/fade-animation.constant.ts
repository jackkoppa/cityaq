import { trigger, transition, style, animate, AnimationTriggerMetadata } from '@angular/animations';

const FADE_DURATION = '300ms';

export const FadeAnimation: AnimationTriggerMetadata = trigger(
    'fade',
    [
        transition(
            ':enter', 
            [
                style({opacity: 0}),
                animate(FADE_DURATION, style({'opacity': 1}))
            ]
        ),
        transition(
            ':leave', 
            [
                style({'opacity': 1}),
                animate(FADE_DURATION, style({'opacity': 0}))              
            ]
        )
    ]
)