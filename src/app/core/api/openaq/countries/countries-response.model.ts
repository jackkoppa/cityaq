// https://docs.openaq.org/#api-Countries

export interface CountriesResponseModel {
    code: string;
    name: string;
    count: number;
    cities: number;
    locations: number;
}