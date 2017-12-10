// https://docs.openaq.org/#api-Latest
import { Parameter } from '../parameter.model';
import { MeasurementUnit } from '../measurement-unit.model';

import { AveragingPeriod } from './averaging-period.model';

export interface LatestMeasurement {
    parameter: Parameter;
    value: number;
    lastUpdated: string;
    unit: MeasurementUnit;
    sourceName: string;
    averagingPeriod: AveragingPeriod
}