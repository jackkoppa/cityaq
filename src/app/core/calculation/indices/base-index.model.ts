// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Range } from './range.model';
import { Parameters } from '../../api/openaq/parameters/parameters.model';

export interface BaseIndex {
    parameter?: Parameters;
    unit?: string;
    good: Range;
    moderate: Range;
    unhealthySensitive: Range;
    unhealthy: Range;
    veryUnhealthy: Range;
    hazardous: Range;
}