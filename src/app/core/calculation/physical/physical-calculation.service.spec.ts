import { PhysicalCalculationService } from './physical-calculation.service';

import { Parameter } from '../../api/openaq/parameter.model';
import { CalculationArguments } from '../calculation-arguments.model';
import { BaseIndex } from '../indices/base-index.model';
import { SO2_INDEX } from '../indices/parameters/so2-index.constant';
import { O3_INDEX } from '../indices/parameters/o3-index.constant';
import { MeasurementUnit } from '../../api/openaq/measurement-unit.model';

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
                allMessages: []
            }
        });

        let testArgs: [Parameter, BaseIndex, [MeasurementUnit, number, MeasurementUnit, number][]][] = [
            // parameter    index           givenUnit   givenConc   expectedUnit    expectedConc         
            ['so2',         SO2_INDEX, [[   'ppm',      12,         'ppb',          12000],
                                        [   'ppm',      13,         'ppb',          13000],
                                        [   'µg/m³',    2.62,       'ppb',          1]]],
            ['o3',          O3_INDEX,  [[   'ppb',      5000,       'ppm',          5],
                                        [   'µg/m³',    2000,       'ppm',          1]]]
        ];
        testArgs.forEach(testCase => {
            let [parameter, index, testValues] = testCase;
            describe(`given ${parameter} and its index`, () => {
                beforeEach(() => {
                    args.parameter = parameter;
                    args.index = index;
                });

                testValues.forEach(testValue => {
                    let [givenUnit, givenConc, expectedUnit, expectedConc] = testValue;
                    describe(`when converting from a concentration of ${givenConc} ${givenUnit} to ${expectedUnit}`, () => {                        
                        beforeEach(() => {
                            args.concentration = givenConc;
                            args.unit = givenUnit;
                        });
                        it(`should have a return object with concentration = ${expectedConc}`, () => {
                            const result = physicalCalculationService.attemptUnitConversion(args);
                            expect(result.concentration).toBe(expectedConc);
                        });
                        it(`should have a return object with unit = ${expectedUnit}`, () => {
                            const result = physicalCalculationService.attemptUnitConversion(args);
                            expect(result.unit).toBe(expectedUnit);
                        });
                    });
                })
            })
        });

    });
});