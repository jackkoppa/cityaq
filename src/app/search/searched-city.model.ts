import { CitiesIndividualResponseModel  } from '../core/api/openaq/cities/cities-individual-response.model';
import { LocationsResponseModel  } from '../core/api/openaq/locations/locations-response.model';

export interface SearchedCity extends CitiesIndividualResponseModel {
    locationsResponse?: LocationsResponseModel;
}