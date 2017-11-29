import { CitiesIndividualResponse  } from '../core/api/openaq/cities/cities-individual-response.model';
import { LocationsResponseModel  } from '../core/api/openaq/locations/locations-response.model';

export interface SearchedCity extends CitiesIndividualResponse {
    locationsResponse?: LocationsResponseModel;
}