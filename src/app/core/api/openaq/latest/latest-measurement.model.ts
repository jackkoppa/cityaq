import { AveragingPeriod } from './averaging-period.model';

export interface LatestMeasurement {
    parameter: string;
    value: number;
    lastUpdated: string;
    unit: string;
    sourceName: string;
    averagingPeriod: AveragingPeriod
}