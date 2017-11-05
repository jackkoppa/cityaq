// https://docs.openaq.org/#api-Fetches
import { FetchFailureModel } from './fetch-failure.model';

export interface FetchResultModel {
    message: string;
    failures: FetchFailureModel;
    count: number;
    duration: number;
    sourceName: string;
}