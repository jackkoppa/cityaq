import { Parameter } from '../core/api/openaq/parameter.model';

export interface ParameterAverage {
    parameter: Parameter,
    concentration: number,
    unit: string,
    AQI: number,
    class: string,
    dataPoints: number
}