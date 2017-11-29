// https://docs.openaq.org/#api-Fetches
import { FetchResult } from './fetch-result.model';

export interface FetchesIndividualResponse {
    timeStarted: string;
    timeEnded: string;
    count: number;
    results: FetchResult[];
}