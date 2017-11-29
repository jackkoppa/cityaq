// https://docs.openaq.org/#api-Parameters
import { ParametersIndividualResponse } from './parameters-individual-response.model';

export interface ParametersResponse extends Array<ParametersIndividualResponse> {}