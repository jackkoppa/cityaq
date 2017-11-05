// https://docs.openaq.org/#api-Countries

export interface CountriesIndividualResponseModel {
    code: string;
    name: string;
    count: number;
    cities: number;
    locations: number;
}