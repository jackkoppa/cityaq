import { Parameter } from '../core/api/openaq/parameter.model';
import { CalculationMessage } from '../core/calculation/calculation-response.models';


export interface ParameterAverage {
    parameter: Parameter,
    concentration: number,
    unit: string,
    AQI: number,
    class: string,
    dataPoints: number,
    message: CalculationMessage
}