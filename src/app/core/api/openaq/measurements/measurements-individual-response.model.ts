// https://docs.openaq.org/#api-Measurements
import { Coordinates } from '../coordinates.model';
import { Parameter } from '../parameter.model';
import { MeasurementUnit } from '../measurement-unit.model';

import { TimezoneDate } from './timezone-date.model';

export interface MeasurementsIndividualResponse {
    date: TimezoneDate;
    parameter: Parameter;
    value: number;
    unit: MeasurementUnit;
    location: string;
    country: string;
    city: string;
    coordinates: Coordinates;
    sourceName: string;
}