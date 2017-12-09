import { CalculationMessage } from './calculation-message.model';

export interface CalculationResponse {
    AQI: number;
    message: CalculationMessage;
}