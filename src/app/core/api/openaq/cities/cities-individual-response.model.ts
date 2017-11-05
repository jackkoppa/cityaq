// https://docs.openaq.org/#api-Cities

export interface CitiesIndividualResponseModel {
    city: string;
    country: string;
    count: number;
    locations: number;
}