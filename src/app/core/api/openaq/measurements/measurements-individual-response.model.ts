// https://docs.openaq.org/#api-Measurements
import { Coordinates } from '../coordinates.model';
import { Parameter } from '../parameter.model';

import { TimezoneDate } from './timezone-date.model';

export interface MeasurementsIndividualResponse {
    date: TimezoneDate;
    parameter: Parameter;
    value: number;
    unit: string;
    location: string;
    country: string;
    city: string;
    coordinates: Coordinates;
    sourceName: string;
}