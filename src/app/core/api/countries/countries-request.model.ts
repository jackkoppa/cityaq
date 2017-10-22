// https://docs.openaq.org/#api-Countries

export class CountriesRequestModel {
    order_by: string[];
    sort: string[];
    limit: number;
    page: number;
}