// https://docs.openaq.org/#api-Fetches
import { FetchResultModel } from './fetch-result.model';

export interface FetchesIndividualResponseModel {
    timeStarted: string;
    timeEnded: string;
    count: number;
    results: FetchResultModel[];
}