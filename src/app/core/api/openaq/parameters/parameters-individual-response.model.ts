// https://docs.openaq.org/#api-Parameters
import { Parameter } from '../parameter.model';

export interface ParametersIndividualResponse {
    id: Parameter;
    name: string;
    description: number;
    preferredUnit: number;
}