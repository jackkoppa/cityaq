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
});