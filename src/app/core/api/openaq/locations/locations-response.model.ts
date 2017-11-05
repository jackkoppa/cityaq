// https://docs.openaq.org/#api-Locations
import { LocationsIndividualResponseModel  } from './locations-individual-response.model';

export interface LocationsResponseModel extends Array<LocationsIndividualResponseModel> {}