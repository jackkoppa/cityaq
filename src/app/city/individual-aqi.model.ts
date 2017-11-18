import { Parameter } from '../core/api/openaq/parameter.model';

export interface IndividualAQI {
    parameter: Parameter,
    value: number
}