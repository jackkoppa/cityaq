// https://docs.openaq.org/#api-Latest

export class LatestResponseModel {
    location: string;
    country: string;
    city: string;
    measurements: any[];
}