import { CalculationService } from './calculation-new.service';

import { Parameter } from '../api/openaq/parameter.model';
import { PhysicalCalculationService } from './physical/physical-calculation.service';
import { AveragingPeriod } from '../api/openaq/latest/averaging-period.model';
import { MeasurementUnit } from '../api/openaq/measurement-unit.model';

import { CalculationResponse, CalculationMessage } from './calculation-response.models';
const calculateAQIData = require('../../../../test/json/calculation-new.service.calculate-aqi.json');

describe('CalculationService', () => {
    console.log(calculateAQIData);
    let harness: Harness;
    let calculationService: CalculationService;
    beforeEach(() => {
        harness = new Harness();
        calculationService = harness.createService();
    });

    describe('calculateAQI', () => {
        let response: CalculationResponse;
        let expectedMsg: CalculationMessage;
        
        describe('given no argument for includeAllMessages', () => {

            describe('with averagingPeriods & units', () => {
                // TODO: need to use something like https://github.com/gburghardt/jasmine-data_driven_tests
                // so that each loop doesn't require setting each variable twice 
                // (once for naming the spec, once in a beforeEach for data accuracy)
                // instead of a forEach, should be able to use `using`
                let baselineTestCases: [Parameter, AveragingPeriod, MeasurementUnit, [number, number][]][] = [
                    //parameter     averagingPeriod                 unit        concentration   expectedAQI 
                    ['pm25',        { value: 24, unit: 'hours' },   'µg/m³',   [[0,             0],
                                                                                [1.123456,      5],
                                                                                [12.1,          51],
                                                                                [55.499,        150],
                                                                                [55.5,          151],
                                                                                [170,           220],
                                                                                [330,           380],
                                                                                [500.499,       500]]], 

                    ['pm10',        { value: 24, unit: 'hours' },   'µg/m³',   [[0,             0],
                                                                                [54.99,         50],
                                                                                [55,            51],
                                                                                [161.111,       104],
                                                                                [354,           200],
                                                                                [400,           266],
                                                                                [480,           370],
                                                                                [604,           500]]]  
                    // [12,            'no2',      { value: 1, unit: 'hours'},     'ppm',  11,             undefined ],
                    // [12,            'co',       { value: 8, unit: 'hours'},     'ppm',  143,            undefined ],
                ]
                baselineTestCases.forEach(test => { 
                    let [parameter, averagingPeriod, unit, inputExpectedPairs] = test;
                    describe(`for the ${parameter} parameter`, () => {
                        test[3].forEach(pair => {
                            let [concentration, expectedAQI] = pair;                         

                            describe(`given a concentration of ${concentration}`, () => {
                                beforeEach(() => {
                                    [parameter, averagingPeriod, unit, inputExpectedPairs] = test;
                                    [concentration, expectedAQI] = pair;
                                    response =  calculationService.calculateAQI(
                                        concentration,
                                        parameter,
                                        averagingPeriod,
                                        unit
                                    );
                                });
                                it(`should return an AQI of ${expectedAQI}`, () => {                        
                                    expect(response.AQI).toBe(expectedAQI);
                                });
                                it(`should return a message of ${expectedMsg}`, () => {
                                    expect(response.message).toBe(expectedMsg);
                                });
                            });

                        });
                    
                    });
                });
            });
        });        
    });

    // describe('calculateAQIByParameter', () => {
    //     let testParameters: { name: Parameter, testValues: [number, number][]}[] = [
    //         {
    //             name: 'pm25',
    //             testValues: [
    //                 //input     expected
    //                 [-40,       0],
    //                 [0,         0],
    //                 [1.123456,  5],
    //                 [12.1,      51],
    //                 [55.499,    150],
    //                 [55.5,      151],
    //                 [170,       220],
    //                 [330,       380],
    //                 [500.499,   500],
    //                 [500.5,     500],
    //                 [10000,     500]
    //             ]
    //         },
    //         {
    //             name: 'pm10',
    //             testValues: [
    //                 //input     expected
    //                 [-40,       0],
    //                 [0,         0],
    //                 [54.99,     50],
    //                 [55,        51],
    //                 [161.111,   104],
    //                 [354,       200],
    //                 [400,       266],
    //                 [480,       370],
    //                 [604,       500],
    //                 [10000.11,  500]
    //             ]
    //         },
    //         {
    //             name: 'o3',
    //             testValues: [
    //                 //input     expected
    //                 [-40,       0],
    //                 [0,         0],
    //                 [0.05499,   50],
    //                 [0.055,     51],
    //                 [0.077,     122],
    //                 [0.090,     161],
    //                 [0.20099,   300]
    //             ]
    //         },
    //         {
    //             name: 'co',
    //             testValues: [
    //                 // input    expected
    //                 [-40,       0],
    //                 [0,         0],
    //                 [4.499,     50],
    //                 [4.5,       51],
    //                 [10,        109],
    //                 [13,        159],
    //                 [25.1234,   265],
    //                 [35,        346],
    //                 [50.4789,   500],
    //                 [10000.11,  500]
    //             ]
    //         },
    //         {
    //             name: 'so2',
    //             testValues: [
    //                 // input    expected
    //                 [-40,       0],
    //                 [0,         0],
    //                 [35.99,     50],
    //                 [36,        51],
    //                 [100,       112],
    //                 [200,       157],
    //                 [400,       232],
    //                 [700,       348],
    //                 [1004.75,   500],
    //                 [10000.11,  500]
    //             ]
    //         },
    //         {
    //             name: 'no2',
    //             testValues: [
    //                 // input    expected
    //                 [-40,       0],
    //                 [0,         0],
    //                 [53.99,     50],
    //                 [54,        51],
    //                 [150,       110],
    //                 [500,       175],
    //                 [825.1234,  230],
    //                 [1300,      313],
    //                 [2049.123,  500],
    //                 [10000,     500]
    //             ]
    //         }
    //     ];
    //     testParameters.forEach(parameter => {
    //         describe(`given the parameter ${parameter.name}`, () => {
    //             parameter.testValues.forEach(test => {
    //                 let [input, expected] = test;
    //                 it(`should output ${expected} for an input of ${input}`, () => {
    //                     expect(calculationService.calculateAQIByParameter(input, parameter.name)).toBe(expected);
    //                 });
    //             });
    //         });
    //     });

    //     // TODO: handle a greater number of edge cases, including non-matching units or time periods
    //     describe('given edge cases outside of the EPA\'s indices', () => {
    //         describe('for o3', () => {
    //             let boundaryTestCases: number[] = [
    //                 0.201,
    //                 0.201111,
    //                 0.400,
    //                 10000
    //             ];
    //             boundaryTestCases.forEach(input => {
    //                 it(`should output 500 for an input of ${input}, ` +
    //                     `by defaulting to the highest available AQI when above the highest EPA-given index`, () => {
    //                     expect(calculationService.calculateAQIByParameter(input, 'o3')).toBe(500);
    //                 });
    //             });
    //         });
    //     });
    // });
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