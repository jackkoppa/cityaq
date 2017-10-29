// https://docs.openaq.org/#api-Latest

export interface LatestResponseModel {
    location: string;
    country: string;
    city: string;
    measurements: Measurement[];
}

interface Measurement {
    parameter: string;
    value: number;
    lastUpdated: Date;
    unit: string;
    sourceName: string;
    averagingPeriod: AveragingPeriod
}

interface AveragingPeriod {
    unit: string;
    value: number
}