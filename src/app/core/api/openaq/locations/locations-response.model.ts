// https://docs.openaq.org/#api-Locations

export interface LocationsResponseModel {
    location: string;
    country: string;
    city: string;
    count: number;
    distance: number;
    sourceName: string;
    sourceNames: any[];
    firstUpdated: Date;
    lastUpdated: Date;
    parameters: any[];
    coordinates: object;
}