// https://docs.openaq.org/#api-Sources

export class SourcesResponseModel {
    url: string;
    adapter: string;
    name: string;
    city: string;
    country: string;
    description: string;
    resolution: string;
    sourceURL: string;
    contacts: string[];
    active: boolean;
}