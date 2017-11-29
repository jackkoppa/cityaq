// https://docs.openaq.org/#api-Countries

export interface CountriesIndividualResponse {
    code: string;
    name: string;
    count: number;
    cities: number;
    locations: number;
}