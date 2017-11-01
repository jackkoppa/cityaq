import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
    let calculationService: CalculationService;
    beforeEach(() => calculationService = new CalculationService());

    describe('calculatePM25AQI', () => {
        let testCases: [number, number][] = [
            // input    expected
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
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should output ${expected} for an input of ${input}`, () => {
                expect(calculationService.calculatePM25AQI(input)).toBe(expected);
            });
        });

        describe('given disallowed input values', () => {
            let disallowedTestCases: [any, string][] = [
                [{}, 'an empty object'],
                [['one', 'two'], 'an array with elements'],
            ]
            disallowedTestCases.forEach(test => {
                let [input, inputDescription] = test;
                it(`should throw an error given ${inputDescription}`, () => {
                    let testFn = () => { calculationService.calculatePM25AQI(input) };
                    expect(testFn).toThrow();
                });
            });
        });
    });

    describe('calculatePM10AQI', () => {
        let testCases: [number, number][] = [            
            // input    expected
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
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should output ${expected} for an input of ${input}`, () => {
                expect(calculationService.calculatePM10AQI(input)).toBe(expected);
            });
        });
    });

    describe('calculateO3AQI', () => {
        let testCases: [number, number][] = [            
            // input    expected
            [-40,       0],
            [0,         0],
            [0.05499,   50],
            [0.055,     51],
            [0.077,     122],
            [0.090,     161],
            [0.20099,   300]
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should output ${expected} for an input of ${input}`, () => {
                expect(calculationService.calculateO3AQI(input)).toBe(expected);
            });
        });
        
        describe('given edge cases beyond the EPA-recorded indices', () => {
            let boundaryTestCases: number[] = [
                0.201,
                0.201111,
                0.400,
                10000
            ];
            boundaryTestCases.forEach(input => {
                it(`should output 500 for an input of ${input}, ` +
                    `by defaulting to the highest available AQI when above the highest EPA-given index`, () => {
                    expect(calculationService.calculateO3AQI(input)).toBe(500);
                });
            });
        })
    });

    describe('calculateCOAQI', () => {
        let testCases: [number, number][] = [            
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
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should output ${expected} for an input of ${input}`, () => {
                expect(calculationService.calculateCOAQI(input)).toBe(expected);
            });
        });
    });

    describe('calculateSO2AQI', () => {
        let testCases: [number, number][] = [            
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
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should output ${expected} for an input of ${input}`, () => {
                expect(calculationService.calculateSO2AQI(input)).toBe(expected);
            });
        });
    });
    
    describe('calculateNO2AQI', () => {
        let testCases: [number, number][] = [            
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
            [10000,  500]
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should output ${expected} for an input of ${input}`, () => {
                expect(calculationService.calculateNO2AQI(input)).toBe(expected);
            });
        });
    });
});