import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
    let calculationService: CalculationService;
    beforeEach(() => calculationService = new CalculationService());

    describe('calculatePM25AQI', () => {
        let testCases: [number, number][] = [
            // input    expected
            [0,         0],
            [1,         4],
            [20,        68],
            [40,        112],
            [200,       250],
            [250.4,     300],
            [255,       305],
            [256,       306],
            [277,       327],
            [351,       401],
            [400,       434],
            [450,       467]
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it('should output ' + expected + ' for an input of ' + input, () => {
                expect(calculationService.calculatePM25AQI(input)).toBe(expected);
            });
        });
    });

    describe('calculatePM10AQI', () => {
        let testCases: [number, number][] = [            
            // input    expected
            [0,         0],
            [10,        9],
            [54,        50],
            [54.499,    50],
            [255,       151],
            [425,       301],
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it('should output ' + expected + ' for an input of ' + input, () => {
                expect(calculationService.calculatePM10AQI(input)).toBe(expected);
            });
        });
    });
});