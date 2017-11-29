// https://docs.openaq.org/#api-Latest
import { LatestMeasurement } from './latest-measurement.model';

export interface LatestIndividualResponse {
    location: string;
    country: string;
    city: string;
    measurements: LatestMeasurement[];
}