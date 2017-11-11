import { SearchedCity } from '../search/searched-city.model';
import { LatestResponseModel } from '../core/api/openaq/latest/latest-response.model';

export interface LatestCityMeasurements extends SearchedCity {
    latestResponse?: LatestResponseModel;
}