// https://docs.openaq.org/#api-Measurements

export interface MeasurementsResponseModel {
    date: object;
    parameter: string;
    value: number;
    unit: string;
    location: string;
    country: string;
    city: string;
    coordinates: object;
    sourceName: string;
}