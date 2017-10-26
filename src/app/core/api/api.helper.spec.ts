import { ApiHelper } from './api.helper';

describe('ApiHelper', () => {
    
    describe('buildQueryString', () => {
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
                expect(ApiHelper.buildQueryString(obj)).toBe(expectedString);
            });
        });
    });
});