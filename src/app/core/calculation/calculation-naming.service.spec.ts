import { CalculationNamingService, LevelName } from './calculation-naming.service';

describe('CalculationNamingService', () => {
    let calculationNamingService: CalculationNamingService;
    beforeEach(() => calculationNamingService = new CalculationNamingService());

    describe('getLevelDescription', () => {
        let testCases: [string, string][] = [
            // input                expected
            ['good',                'Good'],
            ['moderate',            'Moderate'],
            ['unhealthySensitive',  'Unhealthy for Sensitive Groups'],
            ['unhealthy',           'Unhealthy'],
            ['veryUnhealthy',       'Very Unhealthy'],
            ['hazardous1',          'Hazardous'],
            ['hazardous2',          'Hazardous'],
            ['random string',       'Unknown'],
            [null,                  'Unknown']
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should return description of "${expected}" for a level name of "${input}"`, () => {
                expect(calculationNamingService.getLevelDescription(<LevelName>input))
                    .toBe(expected);
            })
        })
    });
});