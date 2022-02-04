import { group } from "console"
import { TestInfo } from "../data/TestInfo"
import { testInfoGenerator } from "./TestInfoGenerator"

describe('TestInfoGenerator', () => {
    describe('parse' , () => {
        test('should return TestInfo', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [],
                tests: []
            };

            //Act
            const actualTestInfo = testInfoGenerator.parse('');

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })

        test('should parse describe line', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [
                    {
                        name: 'Block',
                        groups: [],
                        tests: []
                    }
                ],
                tests: []
            };

            const input = "#Block"

            //Act
            const actualTestInfo = testInfoGenerator.parse(input);

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })

        test('should parse test line', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [],
                tests: [
                    {name: 'Block'}
                ]
            };

            const input = "- Block"

            //Act
            const actualTestInfo = testInfoGenerator.parse(input);

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })

        test('should parse multiple test lines', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [],
                tests: [
                    {name: 'Test 1'},
                    {name: 'Test 2'}
                ]
            };

            const input = [
                '- Test 1', 
                '- Test 2'
            ].join('\n')

            //Act
            const actualTestInfo = testInfoGenerator.parse(input);

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })

        test('should parse nested block lines', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [
                    {
                        name: 'Block 1',
                        groups: [
                            { 
                                name: 'Block 2',
                                groups: [
                                    { 
                                        name: 'Block 3',
                                        groups: [],
                                        tests: []
                                    }
                                ],
                                tests: []
                            }
                        ],
                        tests: []
                    }
                ],
                tests: []
            };

            const input = [
                '#Block 1', 
                '##Block 2',
                '###Block 3'
            ].join('\n')

            //Act
            const actualTestInfo = testInfoGenerator.parse(input);

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })

        test('should parse nested block and test lines', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [
                    {
                        name: 'Block 1',
                        groups: [
                            { 
                                name: 'Block 2',
                                groups: [
                                    { 
                                        name: 'Block 3',
                                        groups: [],
                                        tests: [
                                            {name: 'Test 1 in Block 3'},
                                            {name: 'Test 2 in Block 3'}
                                        ]
                                    }
                                ],
                                tests: [
                                    {name: 'Test 1 in Block 2'},
                                    {name: 'Test 2 in Block 2'}
                                ]
                            }
                        ],
                        tests: [
                            {name: 'Test 1 in Block 1'},
                            {name: 'Test 2 in Block 1'}
                        ]
                    }
                ],
                tests: []
            };

            const input = [
                '#Block 1', 
                '- Test 1 in Block 1', 
                '- Test 2 in Block 1', 
                '##Block 2',
                '- Test 1 in Block 2', 
                '- Test 2 in Block 2', 
                '###Block 3',
                '- Test 1 in Block 3', 
                '- Test 2 in Block 3', 
            ].join('\n')

            //Act
            const actualTestInfo = testInfoGenerator.parse(input);

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })

        test('should reset grouping with empty line', () => {
            //Arrange
            const expectedTestInfo : TestInfo = {
                groups: [
                    {
                        name: 'Block 1',
                        groups: [],
                        tests: [
                            {name: 'Test in Block 1'},
                        ]
                    }

                ],
                tests: [
                    {name: 'Top Level Test 1'},
                    {name: 'Top Level Test 2'}
                ]
            };

            const input = [
                '# Block 1', 
                '- Test in Block 1',
                '',
                '- Top Level Test 1',
                '- Top Level Test 2',
            ].join('\n')

            //Act
            const actualTestInfo = testInfoGenerator.parse(input);

            //Assert
            expect(actualTestInfo).toEqual(expectedTestInfo);
        })
    })
})