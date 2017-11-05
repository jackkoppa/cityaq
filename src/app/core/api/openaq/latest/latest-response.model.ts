// https://docs.openaq.org/#api-Latest
import { LatestIndividualResponseModel } from './latest-individual-response.model';

export interface LatestResponseModel extends Array<LatestIndividualResponseModel> {}