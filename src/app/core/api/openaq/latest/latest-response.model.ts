// https://docs.openaq.org/#api-Latest
import { LatestIndividualResponse } from './latest-individual-response.model';

export interface LatestResponse extends Array<LatestIndividualResponse> {}