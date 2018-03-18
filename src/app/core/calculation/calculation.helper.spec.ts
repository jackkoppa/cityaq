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
                [120.52e-5,     5],
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

    describe('setSignificantDigits', () => {

        const testCases: [number, number, number][] = [
            //inputValue    significantDigits   outputValue
            [0,             1,                  0],
            [2000,          1,                  2000],
            [1234.567,      3,                  1230],
            [123e5,         5,                  123.00e5],
            [12300.456,     6,                  12300.5],
            [12,            1,                  10],
        ]
        testCases.forEach(testCase => {
            const [inputValue, significantDigits, outputValue] = testCase;

            describe(`with an input value of ${inputValue}, setting to ${significantDigits} significant digits`, () => {
                const result = CalculationHelper.setSignificantDigits(inputValue, significantDigits);
                it(`should output ${outputValue}`, () => {
                    expect(result).toBe(outputValue);
                });
            });
        });
    });
});