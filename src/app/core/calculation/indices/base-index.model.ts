// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Levels } from './levels.model';
import { ParametersModel } from '../../api/openaq/parameters.model';

export interface BaseIndex {
    parameter: ParametersModel;
    unit: string;
    hours: number;
    levels: Levels;    
}