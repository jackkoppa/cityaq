// https://docs.openaq.org/#api-Sources

export class SourcesRequestModel {
    order_by: string[];
    sort: string[];
    limit: number;
    page: number;
}