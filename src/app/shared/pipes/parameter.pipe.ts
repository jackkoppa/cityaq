import { Pipe, PipeTransform } from '@angular/core';

import { Parameter } from '../../core/api/openaq/parameters.model';
import { PARAMETER_DISPLAY_NAMES } from '../../core/calculation/indices/parameter-display-names.constant';

@Pipe({name: 'parameter'})
export class ParameterPipe implements PipeTransform {
    transform(parameter: Parameter): string {
        if (!parameter) return '';
        if (PARAMETER_DISPLAY_NAMES.hasOwnProperty(parameter)) {
            return PARAMETER_DISPLAY_NAMES[parameter];
        } else {
            return parameter;
        }
    }
}