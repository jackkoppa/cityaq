import { NamingService, LevelName } from './naming.service';

describe('NamingService', () => {
    let namingService: NamingService;
    beforeEach(() => namingService = new NamingService());

    describe('getAQIClassName', () => {
        let testCases: [number, string][] = [
            // input                expected
            [0,         'green'],
            [25.12345,  'green'],
            [50,        'green'],
            [50.4999,   'green'],
            [50.5000,   'yellow'],
            [51,        'yellow'],
            [100,       'yellow'],
            [100.4999,  'yellow'],
            [100.5000,  'orange'],
            [120,       'orange'],
            [150,       'orange'],
            [151,       'red'],
            [200,       'red'],
            [201,       'purple'],
            [300,       'purple'],
            [301,       'maroon'],
            [400,       'maroon'],
            [401,       'maroon'],
            [500,       'maroon'],
            [500.4999,  'maroon'],
            [500.5000,  'unknown'],
            [600,       'unknown'],
            [-1,        'unknown'],
        ];
        testCases.forEach(test => {
            let [input, expected] = test;
            it(`should return class name of "${expected}" for an AQI of ${input}`, () => {
                expect(namingService.getAQIClassName(input)).toBe(expected);
            });
        });
    });

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
                expect(namingService.getLevelDescription(<LevelName>input))
                    .toBe(expected);
            });
        });
    });
});