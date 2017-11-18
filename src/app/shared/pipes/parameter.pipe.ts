import { Pipe, PipeTransform } from '@angular/core';

import { ParametersModel } from '../../core/api/openaq/parameters.model';

@Pipe({name: 'parameter'})
export class ParameterPipe implements PipeTransform {
    transform(parameter: ParametersModel): string {
        if (!parameter) return '';
        if (PARAMETER_DISPLAY_STRINGS.hasOwnProperty(parameter)) {
            return PARAMETER_DISPLAY_STRINGS[parameter];
        } else {
            return parameter;
        }
    }
}

const PARAMETER_DISPLAY_STRINGS: { [P in ParametersModel]: string } = {
    'pm25': 'PM 2.5',
    'pm10': 'PM 10',
    'no2': 'NO₂',
    'so2': 'SO₂',
    'o3': 'O₃',
    'co': 'CO',
    'bc': 'BC'
}