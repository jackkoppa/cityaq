export interface AttemptUnitConversionCase {
    originalOrder: number;
    parameter: string;
    testType: string;
    concentration: number;
    unit: string;
    expectedConcentration: number;
    expectedUnit: string;
}