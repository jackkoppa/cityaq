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
});