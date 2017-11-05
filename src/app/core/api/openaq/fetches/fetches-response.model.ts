// https://docs.openaq.org/#api-Fetches
import { FetchesIndividualResponseModel } from './fetches-individual-response.model';

export interface FetchesResponseModel extends Array<FetchesIndividualResponseModel> {}