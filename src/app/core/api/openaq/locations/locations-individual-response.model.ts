// https://docs.openaq.org/#api-Locations
import { Coordinates } from '../coordinates.model';
import { Parameter } from '../parameter.model';

export interface LocationsIndividualResponse {
    location: string;
    country: string;
    city: string;
    count: number;
    distance: number;
    sourceName: string;
    sourceNames: string[];
    firstUpdated: string;
    lastUpdated: string;
    parameters: Parameter[];
    coordinates: Coordinates;
}