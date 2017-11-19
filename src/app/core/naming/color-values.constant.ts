import { ColorName } from './color-name.model';

// TODO: determine if this will be used
// if so, determine if it's worth keeping in-sync w/ Sass using a build script
export const COLOR_VALUES: { [C in ColorName]: [number, number, number] } = {
    //       R      G       B
    green:  [0,     230,    118],
    yellow: [255,   196,    0],
    orange: [255,   110,    0],
    red:    [213,   0,      0],
    purple: [171,   71,     188],
    maroon: [136,   14,     79]
}