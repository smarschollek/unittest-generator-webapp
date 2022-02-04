import { TestInfo } from "../data/TestInfo";
import { jestTextTransformer } from "./JestTextTransformer"

describe('JestTextTransformer', () => {
    describe('transform', () => {
        it('output should be correct when testinfo has no groups or tests', () => {
            //Arrange
            const expectedOutput = '';
            const testInfo: TestInfo = {
                groups: [],
                tests: []
            }

            //Act
            const output = jestTextTransformer.transform(testInfo);

            //Assert
            expect(output).toBe(expectedOutput);
        })

        it('should render describe block', () => {
            //Arrange
            const expectedOutput = "describe('Test', () => {\n" + 
                                   "});"

            const testInfo: TestInfo = {
                groups: [
                    { 
                        name: 'Test',
                        groups: [],
                        tests: []
                    }
                ],
                tests: []
            }

            //Act
            const output = jestTextTransformer.transform(testInfo);

            //Assert
            expect(output).toBe(expectedOutput);
        })

        it('should render describe and test block', () => {
            //Arrange
            const expectedOutput = "describe('Group', () => {\n" + 
                                   "  test('Test', () => {\n" +
                                   "  \n" +
                                   "  });\n" +
                                   "});";


            const testInfo: TestInfo = {
                groups: [
                    { 
                        name: 'Group',
                        groups: [],
                        tests: [
                            { name: 'Test' }
                        ]
                    }
                ],
                tests: []
            }
            
            //Act
            const output = jestTextTransformer.transform(testInfo);

            //Assert
            expect(output).toBe(expectedOutput);
        })

        it('should render nested describes correctly', () => {
            //Arrange
            const expectedOutput = "describe('Base', () => {\n" + 
                                   "  describe('Nested', () => {\n" + 
                                   "  });\n" +
                                   "});";


            const testInfo: TestInfo = {
                groups: [
                    { 
                        name: 'Base',
                        groups: [
                            { 
                                name: 'Nested',
                                groups: [],
                                tests: []
                            }
                        ],
                        tests: []
                    }
                ],
                tests: []
            }
            
            //Act
            const output = jestTextTransformer.transform(testInfo);

            //Assert
            expect(output).toBe(expectedOutput);
        })

        it('should render multiple descibes correctly', () => {
            //Arrange
            const expectedOutput = "describe('Block1', () => {\n" + 
                                   "  test('Test1', () => {\n" +
                                   "  \n" + 
                                   "  });\n" +
                                   "});\n" +
                                   "\n" +
                                   "describe('Block2', () => {\n" + 
                                   "  test('Test2', () => {\n" +
                                   "  \n" +
                                   "  });\n" +
                                   "});";


            const testInfo: TestInfo = {
                groups: [
                    { 
                        name: 'Block1',
                        groups: [],
                        tests: [
                            { name: 'Test1' }
                        ]
                    },
                    { 
                        name: 'Block2',
                        groups: [],
                        tests: [
                            { name: 'Test2' }
                        ]
                    }
                ],
                tests: []
            }
            
            //Act
            const output = jestTextTransformer.transform(testInfo);

            //Assert
            expect(output).toBe(expectedOutput);
        })
    })
})