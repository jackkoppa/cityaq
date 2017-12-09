// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Parameter } from '../../api/openaq/parameter.model';
import { AveragingPeriod } from '../../api/openaq/latest/averaging-period.model'
import { MeasurementUnit } from '../physical/measurement-unit.model';

import { Level } from './level.model';

export interface BaseIndex {
    unit: MeasurementUnit;
    decimalPlaces: number;
    averagingPeriodLevels: AveragingPeriodLevel[]
}

interface AveragingPeriodLevel {
    averagingPeriod: AveragingPeriod;
    levels: Level;
}