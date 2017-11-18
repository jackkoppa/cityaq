// https://docs.openaq.org/#api-Measurements
import { CoordinatesModel } from '../coordinates.model';
import { Parameter } from '../parameter.model';
import { TimezoneDateModel } from './timezone-date.model';

export interface MeasurementsIndividualResponseModel {
    date: TimezoneDateModel;
    parameter: Parameter;
    value: number;
    unit: string;
    location: string;
    country: string;
    city: string;
    coordinates: CoordinatesModel;
    sourceName: string;
}