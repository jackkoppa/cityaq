import { NgModule } from '@angular/core';

import { CountryNamePipe } from './country-name.pipe';
import { ParameterPipe } from './parameter.pipe';

@NgModule({
    imports: [],
    exports: [
        CountryNamePipe,
        ParameterPipe
    ],
    declarations: [
        CountryNamePipe,
        ParameterPipe
    ],
    providers: [
        CountryNamePipe,
        ParameterPipe
    ]
})
export class PipesModule {}