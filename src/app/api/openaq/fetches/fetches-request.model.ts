// https://docs.openaq.org/#api-Fetches

export class FetchesRequestModel {
    order_by: string[];
    sort: string[];
    limit: number;
    page: number;
}