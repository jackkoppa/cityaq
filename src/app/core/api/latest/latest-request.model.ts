// https://docs.openaq.org/#api-Latest

export class LatestRequestModel {
    city: string;
    country: string;
    location: string;
    parameter: string;
    has_geo: boolean;
    coordinates: string;
    radius: number;
    order_by: string[];
    sort: string[];
    limit: number;
    page: number;
}