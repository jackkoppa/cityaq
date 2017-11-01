// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Levels } from './levels.model';
import { Parameters } from '../../api/openaq/parameters/parameters.model';

export interface BaseIndex {
    parameter: Parameters;
    unit: string;
    hours: number;
    levels: Levels;    
}