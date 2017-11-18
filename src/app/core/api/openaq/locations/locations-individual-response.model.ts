// https://docs.openaq.org/#api-Locations
import { CoordinatesModel } from '../coordinates.model';
import { Parameter } from '../parameters.model';

export interface LocationsIndividualResponseModel {
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
    coordinates: CoordinatesModel;
}