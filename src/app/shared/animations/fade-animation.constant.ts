import { trigger, transition, style, animate, state, AnimationTriggerMetadata } from '@angular/animations';

export const FadeAnimation: AnimationTriggerMetadata = trigger(
    'fade',
    [
        transition(
            ':enter', 
            [
                style({opacity: 0}),
                animate('500ms', style({'opacity': 1}))
            ]
        ),
        transition(
            ':leave', 
            [
                style({'opacity': 1}),
                animate('500ms', style({'opacity': 0}))              
            ]
        )
    ]
)