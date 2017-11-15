import { NgModule } from '@angular/core';

import { CountryNamePipe } from './country-name.pipe';

@NgModule({
    imports: [],
    exports: [CountryNamePipe],
    declarations: [CountryNamePipe]
})
export class PipesModule {}