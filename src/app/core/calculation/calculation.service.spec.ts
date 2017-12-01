import { CalculationService } from './calculation.service';

import { Parameter } from '../api/openaq/parameter.model';

describe('CalculationService', () => {
    let calculationService: CalculationService;
    beforeEach(() => calculationService = new CalculationService());

    describe('calculateAQIByParameter', () => {
        let testParameters: { name: Parameter, testValues: [number, number][]}[] = [
            {
                name: 'pm25',
                testValues: [
                    //input     expected
                    [-40,       0],
                    [0,         0],
                    [1.123456,  5],
                    [12.1,      51],
                    [55.499,    150],
                    [55.5,      151],
                    [170,       220],
                    [330,       380],
                    [500.499,   500],
                    [500.5,     500],
                    [10000,     500]
                ]
            },
            {
                name: 'pm10',
                testValues: [
                    //input     expected
                    [-40,       0],
                    [0,         0],
                    [54.99,     50],
                    [55,        51],
                    [161.111,   104],
                    [354,       200],
                    [400,       266],
                    [480,       370],
                    [604,       500],
                    [10000.11,  500]
                ]
            },
            {
                name: 'o3',
                testValues: [
                    //input     expected
                    [-40,       0],
                    [0,         0],
                    [0.05499,   50],
                    [0.055,     51],
                    [0.077,     122],
                    [0.090,     161],
                    [0.20099,   300]
                ]
            },
            {
                name: 'co',
                testValues: [
                    // input    expected
                    [-40,       0],
                    [0,         0],
                    [4.499,     50],
                    [4.5,       51],
                    [10,        109],
                    [13,        159],
                    [25.1234,   265],
                    [35,        346],
                    [50.4789,   500],
                    [10000.11,  500]
                ]
            },
            {
                name: 'so2',
                testValues: [
                    // input    expected
                    [-40,       0],
                    [0,         0],
                    [35.99,     50],
                    [36,        51],
                    [100,       112],
                    [200,       157],
                    [400,       232],
                    [700,       348],
                    [1004.75,   500],
                    [10000.11,  500]
                ]
            },
            {
                name: 'no2',
                testValues: [
                    // input    expected
                    [-40,       0],
                    [0,         0],
                    [53.99,     50],
                    [54,        51],
                    [150,       110],
                    [500,       175],
                    [825.1234,  230],
                    [1300,      313],
                    [2049.123,  500],
                    [10000,     500]
                ]
            }
        ];
        testParameters.forEach(parameter => {
            describe(`given the parameter ${parameter.name}`, () => {
                parameter.testValues.forEach(test => {
                    let [input, expected] = test;
                    it(`should output ${expected} for an input of ${input}`, () => {
                        expect(calculationService.calculateAQIByParameter(input, parameter.name)).toBe(expected);
                    });
                });
            });
        });

        // TODO: handle a greater number of edge cases, including non-matching units or time periods
        describe('given edge cases outside of the EPA\'s indices', () => {
            describe('for o3', () => {
                let boundaryTestCases: number[] = [
                    0.201,
                    0.201111,
                    0.400,
                    10000
                ];
                boundaryTestCases.forEach(input => {
                    it(`should output 500 for an input of ${input}, ` +
                        `by defaulting to the highest available AQI when above the highest EPA-given index`, () => {
                        expect(calculationService.calculateAQIByParameter(input, 'o3')).toBe(500);
                    });
                });
            });
        });
    });
});