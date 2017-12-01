import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';
import { SearchedCity } from '../search/searched-city.model';

export interface LatestCityMeasurements extends SearchedCity {
    latestResponse?: LatestResponse;
}