import { CalculationHelper } from './calculation.helper';

describe('CalculationHelper', () => {

    describe('getSignificantDigitCount', () => {
        
        describe('given an input within normal min/max bounds', () => {
            const testCases: [number, number][] = [
                //input         output
                [0,             0],
                [2,             1],
                [1234,          4],
                [2.34,          3],
                [3000,          1],
                [0.0034,        2],
                [120.5e12,      4],
                [1120.5e+12,    5],
                [120.52e-5,    5],
                [Math.PI,       16]
            ]
            testCases.forEach(testCase => {
                const [input, output] = testCase;
    
                describe(`with an input of ${input}`, () => {
                    const result = CalculationHelper.getSignificantDigitCount(input);
                    it(`should output ${output} as the number of significant digits`, () => {
                        expect(result).toBe(output);
                    });
                });
            });
        });

        describe('given an input outside of min/max bounds', () => {
            const testCases: number[] = [
                9.008e15,
                -9.008e15,
                10.5e40,
                -10.5e40
            ]
            testCases.forEach(testCase => {
                    
                describe(`with an input of ${testCase}`, () => {
                    it(`should throw an error`, () => {
                        expect(() => CalculationHelper.getSignificantDigitCount(testCase)).toThrow();
                    });
                });
            });
        })
    });
});