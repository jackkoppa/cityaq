// https://docs.openaq.org/#api-Fetches

export class FetchesResponseModel {
    timeStarted: Date;
    timeEnded: Date;
    count: number;
    results: object;
}