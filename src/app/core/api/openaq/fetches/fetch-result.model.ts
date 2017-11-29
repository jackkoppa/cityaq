// https://docs.openaq.org/#api-Fetches
import { FetchFailure } from './fetch-failure.model';

export interface FetchResult {
    message: string;
    failures: FetchFailure;
    count: number;
    duration: number;
    sourceName: string;
}