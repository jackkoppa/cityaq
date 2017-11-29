import { CitiesIndividualResponse  } from '../core/api/openaq/cities/cities-individual-response.model';
import { LocationsResponse  } from '../core/api/openaq/locations/locations-response.model';

export interface SearchedCity extends CitiesIndividualResponse {
    locationsResponse?: LocationsResponse;
}