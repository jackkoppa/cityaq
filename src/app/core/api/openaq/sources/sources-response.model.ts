// https://docs.openaq.org/#api-Sources
export interface SourcesResponse {
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