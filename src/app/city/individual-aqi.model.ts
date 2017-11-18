import { Parameter } from '../core/api/openaq/parameters.model';

export interface IndividualAQI {
    parameter: Parameter,
    value: number
}