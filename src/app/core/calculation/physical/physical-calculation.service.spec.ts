import { PhysicalCalculationService } from './physical-calculation.service';

import { AttemptUnitConversionCase } from '../../../../../test/spreadsheets/physical-calculation.service.attempt-unit-conversion.model';

import { Parameter } from '../../api/openaq/parameter.model';
import { CalculationArguments } from '../calculation-arguments.model';
import { BaseIndex } from '../indices/base-index.model';
import { PARAMETER_INDEX_MAP } from '../indices/parameters/parameter-index-map.constant';
import { MeasurementUnit } from '../../api/openaq/measurement-unit.model';

const attemptUnitConversionTestCases: AttemptUnitConversionCase[] = require('../../../../../test/json/physical-calculation.service.attempt-unit-conversion.json');

describe('PhysicalCalculationService', () => {
    let physicalCalculationService: PhysicalCalculationService;
    beforeEach(() => physicalCalculationService = new PhysicalCalculationService());

    describe('attemptUnitConversion', () => {
        let args: CalculationArguments;
        beforeEach(() => {
            args = {
                concentration: undefined,      
                parameter: undefined,
                averagingPeriod: undefined,
                unit: undefined,
                index: undefined,
                includeAllMessages: undefined,                
                allMessages: [],
                AQI: undefined
            }
        });

        const testCases = attemptUnitConversionTestCases;

        testCases.forEach(testCase => {
            describe(`when ${testCase.testType}, ` +
                `for parameter ${testCase.parameter}, ` +
                `with a concentration of ${testCase.concentration} ${testCase.unit}, `, () => {

                let result: CalculationArguments;
                beforeEach(() => {
                    args.parameter = testCase.parameter as Parameter;
                    args.concentration = testCase.concentration;
                    args.unit = testCase.unit as MeasurementUnit;
                    args.index = PARAMETER_INDEX_MAP[testCase.parameter];
                    result = physicalCalculationService.attemptUnitConversion(args)
                });
                it(`should convert to a concentration of ${testCase.expectedConcentration}`, () => {
                    expect(result.concentration).toBe(testCase.expectedConcentration);
                });
                it(`should convert to a unit of ${testCase.expectedUnit}`, () => {
                    expect(result.unit).toBe(testCase.expectedUnit);
                });
            });
        });
    });
});