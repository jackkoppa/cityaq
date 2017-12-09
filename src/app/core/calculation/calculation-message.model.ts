import { MessageSeverity } from './message-severity.model';

export interface CalculationMessage {
    severity: MessageSeverity;
    text: string;
}