import { SearchedCity } from '../search/searched-city.model';
import { LatestResponse } from '../core/api/openaq/latest/latest-response.model';

export interface LatestCityMeasurements extends SearchedCity {
    latestResponse?: LatestResponse;
}