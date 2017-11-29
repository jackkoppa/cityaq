// https://docs.openaq.org/#api-Locations
import { LocationsIndividualResponse  } from './locations-individual-response.model';

export interface LocationsResponse extends Array<LocationsIndividualResponse> {}