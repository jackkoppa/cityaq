// https://docs.openaq.org/#api-Locations

export class LocationsRequestModel {
    city: string;
    country: string;
    locations: string;
    paramater: string;
    has_geo: boolean;
    coordinates: string;
    nearest: number;
    radius: number;
    order_by: string[];
    sort: string[];
    limit: number;
    page: number;
}