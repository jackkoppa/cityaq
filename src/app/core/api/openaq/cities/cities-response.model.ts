// https://docs.openaq.org/#api-Cities
import { CitiesIndividualResponse } from './cities-individual-response.model';

export interface CitiesResponse extends Array<CitiesIndividualResponse> {}