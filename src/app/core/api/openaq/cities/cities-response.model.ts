// https://docs.openaq.org/#api-Cities
import { CitiesIndividualResponseModel } from './cities-individual-response.model';

export interface CitiesResponseModel extends Array<CitiesIndividualResponseModel> {
    [index: number]: CitiesIndividualResponseModel;
}