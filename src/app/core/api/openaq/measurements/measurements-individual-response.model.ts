// https://docs.openaq.org/#api-Measurements
import { CoordinatesModel } from '../coordinates.model';
import { ParametersModel } from '../parameters.model';
import { TimezoneDateModel } from './timezone-date.model';

export interface MeasurementsIndividualResponseModel {
    date: TimezoneDateModel;
    parameter: ParametersModel;
    value: number;
    unit: string;
    location: string;
    country: string;
    city: string;
    coordinates: CoordinatesModel;
    sourceName: string;
}