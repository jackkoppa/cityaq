// https://docs.openaq.org/#api-Countries
import { CountriesIndividualResponseModel } from './countries-individual-response.model';

export interface CountriesResponseModel extends Array<CountriesIndividualResponseModel> {}