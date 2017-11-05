// https://docs.openaq.org/#api-Parameters
import { ParametersIndividualResponseModel } from './parameters-individual-response.model';

export interface ParametersResponseModel extends Array<ParametersIndividualResponseModel> {}