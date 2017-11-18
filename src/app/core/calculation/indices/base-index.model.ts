// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Level } from './levels.model';
import { Parameter } from '../../api/openaq/parameters.model';

export interface BaseIndex {
    parameter: Parameter;
    unit: string;
    hours: number;
    levels: Level;    
}