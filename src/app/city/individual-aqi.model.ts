import { ParametersModel } from '../core/api/openaq/parameters.model';

export interface IndividualAQI {
    parameter: ParametersModel,
    value: number
}