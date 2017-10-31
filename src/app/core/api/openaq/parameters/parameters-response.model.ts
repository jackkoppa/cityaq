// https://docs.openaq.org/#api-Parameters
import { Parameters } from './parameters.model';

export interface ParametersResponseModel {
    id: Parameters;
    name: string;
    description: number;
    preferredUnit: number;
}