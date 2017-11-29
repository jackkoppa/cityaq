// https://docs.openaq.org/#api-Countries
import { CountriesIndividualResponse } from './countries-individual-response.model';

export interface CountriesResponse extends Array<CountriesIndividualResponse> {}