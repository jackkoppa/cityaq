import { CalculationService } from './calculation-new.service';

import { CalculateAQICase } from '../../../../test/spreadsheets/calculation-new.service.calculate-aqi.model';

import { Parameter } from '../api/openaq/parameter.model';
import { PhysicalCalculationService } from './physical/physical-calculation.service';
import { AveragingPeriod } from '../api/openaq/latest/averaging-period.model';
import { MeasurementUnit } from '../api/openaq/measurement-unit.model';

import { CalculationResponse, CalculationMessage } from './calculation-response.models';

const calculateAQICases: CalculateAQICase[] = require('../../../../test/json/calculation-new.service.calculate-aqi.json');

describe('CalculationService', () => {
    let harness: Harness;
    let calculationService: CalculationService;
    beforeEach(() => {
        harness = new Harness();
        calculationService = harness.createService();
    });

    describe('calculateAQI', () => {
        let response: CalculationResponse;
        let expectedMsg: CalculationMessage;

        const testCases = calculateAQICases;

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

class Harness {
    physicalCalculationService: PhysicalCalculationService = <PhysicalCalculationService>{};

    constructor() {
        this.mockCommonMethods();
    }

    createService(): CalculationService {
        return new CalculationService(this.physicalCalculationService);
    }

    mockCommonMethods(): void {
        this.physicalCalculationService.attemptUnitConversion = (args) => args;
    }
}