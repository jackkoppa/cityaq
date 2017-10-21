// https://docs.openaq.org/#api-Cities

export class CitiesRequestModel {
    country: string = null;
    order_by: string[] = [];
    sort: string[] = [];
    limit: number;
    page: number;
}