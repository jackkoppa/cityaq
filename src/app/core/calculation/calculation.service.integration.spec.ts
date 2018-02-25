// Testing that requires real dependencies (i.e. PhysicalCalculationService)
// to accurately calculate air quality data that doesn't match expectations in the AQI indices
import { CalculationService } from './calculation.service';
import { PhysicalCalculationService } from './physical/physical-calculation.service';

import { CalculateAQICase } from '../../../../test/spreadsheets/calculation.service.calculate-aqi.model';

import { Parameter } from '../api/openaq/parameter.model';
import { MeasurementUnit } from '../api/openaq/measurement-unit.model';

import { CalculationResponse, CalculationMessage } from './calculation-response.models';

const calculateAQIIntegrationCases: CalculateAQICase[] = require('../../../../test/json/calculation.service.calculate-aqi.integration.json');

describe('CalculationService integration test', () => {
    let calculationService: CalculationService;
    beforeEach(() => {
        calculationService = new CalculationService(new PhysicalCalculationService); // use real dependencies
    });

    describe('calculateAQI', () => {
        let response: CalculationResponse;
        let expectedMsg: CalculationMessage;

        const testCases = calculateAQIIntegrationCases;

        testCases.forEach(testCase => {
            describe(`when ${testCase.testType}, ` +
                `given a ${testCase.testDescription}, ` +
                `for parameter ${testCase.parameter}, ` +
                `with a concentration of ${testCase.concentration} ${testCase.unit}, ` +
                `averaged over ${testCase.averagingPeriodValue} ${testCase.averagingPeriodUnit}`, () => {
                    
                    let response: CalculationResponse;
                    beforeEach(() => response = calculationService.calculateAQI(
                        testCase.concentration,
                        testCase.parameter as Parameter,
                        { unit: testCase.averagingPeriodUnit, value: testCase.averagingPeriodValue},
                        testCase.unit as MeasurementUnit,
                        testCase.includeAllMessages
                    ));
                    it(`should return an AQI of ${testCase.expectedAQI}`, () => {
                        expect(response.AQI).toBe(testCase.expectedAQI);
                    });
            })
        });    
    });
});