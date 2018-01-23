import {  } from '../naming/'
import { MeasurementUnit } from '../api/openaq/measurement-unit.model';


export type CalculationResponseSimple = number;

export interface CalculationResponse {
    AQI: CalculationResponseSimple;
    
    unit: MeasurementUnit;
    concentration: number;
    message: CalculationMessage;    
    allMessages?: CalculationMessage[];
}

export interface CalculationMessage {
    severity: MessageSeverity;
    text: string;
}

export enum MessageSeverity {
    Low = 1,
    Medium,
    High
}