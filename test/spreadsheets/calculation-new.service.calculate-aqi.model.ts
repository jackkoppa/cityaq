export interface CalculateAQICase {
    originalOrder: number;
    parameter: string;
    testType: string;
    testDescription: string;
    concentration: number;
    averagingPeriodValue: number;
    averagingPeriodUnit: string;
    unit: string;
    includeAllMessages: boolean;
    expectedAQI: number;
    expectedMessage: string;
    expectedAllMessages: string
}