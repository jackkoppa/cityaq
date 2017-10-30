import { ApiService } from './api.service';

describe('ApiService', () => {
    let apiService: ApiService;
    beforeEach(() => apiService = new ApiService());

    let queryMethods: string[] = ['buildBaseQueryString', 'buildOpenAQQueryString'];
    queryMethods.forEach(method => {
        describe(method, () => {
            let testCases: [string, any, any][] = [
                [
                    'should convert an object with one string property to a string',  
                    { 
                        someKey: 'some string'
                    },
                    'someKey=some%20string'
                ],
                [
                    'should convert an object with three string properties to a string',
                    {
                        keyOne: 'string one',
                        keyTwo: 'string two',
                        keyThree: 'third string'
                    },
                    'keyOne=string%20one&keyTwo=string%20two&keyThree=third%20string'            
                ],
                [
                    'should convert an object with one boolean property to a string',
                    {
                        booleanProp: true
                    },
                    'booleanProp=true'
                ],
                [
                    'should convert an object with string, boolean, and number props to a string',
                    {
                        stringProp: 'a string value',
                        booleanProp: false,
                        numberProp: 1234
                    },
                    'stringProp=a%20string%20value&booleanProp=false&numberProp=1234'
                ]
            ];
            testCases.forEach(test => {
                let [testName, obj, expectedString] = test;
                it(testName, () => {
                    expect(apiService[method](obj)).toBe(expectedString);
                });
            });
        });
    });

    describe('buildOpenAQQueryString (unique cases)', () => {
        let testCases: [string, any, any][] = [            
            [
                'should convert an array of props to a string with a query param for each array element, with properly encoded brackets',
                {
                    arrayProp: [
                        'array value one',
                        'a second array element'
                    ]
                },
                'arrayProp%5B%5D=array%20value%20one&arrayProp%5B%5D=a%20second%20array%20element'
            ]
        ]

        testCases.forEach(test => {
            let [testName, obj, expectedString] = test;
            it(testName, () => {
                expect(apiService.buildOpenAQQueryString(obj)).toBe(expectedString);
            });
        });
    });
});