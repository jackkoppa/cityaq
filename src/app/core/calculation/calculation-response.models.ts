import {  } from '../naming/'

export type CalculationResponseSimple = number;

export interface CalculationResponse {
    AQI: CalculationResponseSimple;
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