export interface CalculateAQICase {
    originalOrder: number;
    testType: string;
    testDescription: string;
    concentration: number;
    parameter: string;
    averagingPeriodUnit: string;
    averagingPeriodValue: number;
    unit: string;
    includeAllMessages: boolean;
    expectedAQI: number;
    expectedMessage: string;
    expectedAllMessages: string
}