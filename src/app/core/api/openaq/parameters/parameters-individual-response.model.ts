// https://docs.openaq.org/#api-Parameters
import { Parameter } from '../parameter.model';

export interface ParametersIndividualResponseModel {
    id: Parameter;
    name: string;
    description: number;
    preferredUnit: number;
}