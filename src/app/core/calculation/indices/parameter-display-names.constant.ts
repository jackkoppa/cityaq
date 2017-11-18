import { Parameter } from '../../api/openaq/parameter.model';

export const PARAMETER_DISPLAY_NAMES: { [P in Parameter]: string } = {
    'pm25': 'PM 2.5',
    'pm10': 'PM 10',
    'no2': 'NO₂',
    'so2': 'SO₂',
    'o3': 'O₃',
    'co': 'CO',
    'bc': 'BC'
}