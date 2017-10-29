// https://docs.openaq.org/#api-Cities

export interface CitiesResponseModel {
    city: string;
    country: string;
    count: number;
    locations: number;
}