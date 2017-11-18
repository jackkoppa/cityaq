import { Pipe, PipeTransform } from '@angular/core';

import { ParametersModel } from '../../core/api/openaq/parameters.model';
import { PARAMETER_DISPLAY_NAMES } from '../../core/calculation/indices/parameter-display-names.constant';

@Pipe({name: 'parameter'})
export class ParameterPipe implements PipeTransform {
    transform(parameter: ParametersModel): string {
        if (!parameter) return '';
        if (PARAMETER_DISPLAY_NAMES.hasOwnProperty(parameter)) {
            return PARAMETER_DISPLAY_NAMES[parameter];
        } else {
            return parameter;
        }
    }
}