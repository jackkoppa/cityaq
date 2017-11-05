// https://docs.openaq.org/#api-Parameters
import { ParametersModel } from '../parameters.model';

export interface ParametersIndividualResponseModel {
    id: ParametersModel;
    name: string;
    description: number;
    preferredUnit: number;
}