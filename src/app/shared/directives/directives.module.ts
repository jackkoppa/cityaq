import { NgModule } from '@angular/core';

import { UpperCaseDirective } from './uppercase.directive';

@NgModule({
    imports: [],
    exports: [UpperCaseDirective],
    declarations: [UpperCaseDirective]
})
export class DirectivesModule {}