// https://docs.openaq.org/#api-Fetches
import { FetchesIndividualResponse } from './fetches-individual-response.model';

export interface FetchesResponse extends Array<FetchesIndividualResponse> {}