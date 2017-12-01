// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Parameter } from '../../api/openaq/parameter.model';
import { Level } from './level.model';

export interface BaseIndex {
    parameter: Parameter;
    unit: string;
    hours: number;
    decimalPlaces: number;
    levels: Level;    
}