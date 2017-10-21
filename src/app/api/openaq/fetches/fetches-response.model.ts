// https://docs.openaq.org/#api-Fetches

export class FetchesResponseModel {
    timeStarted: datetime;
    timeEnded: datetime;
    count: number;
    results: object;
}