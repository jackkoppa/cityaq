// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Level } from './level.model';
import { Parameter } from '../../api/openaq/parameter.model';

export interface BaseIndex {
    parameter: Parameter;
    unit: string;
    hours: number;
    decimalPlaces: number;
    levels: Level;    
}