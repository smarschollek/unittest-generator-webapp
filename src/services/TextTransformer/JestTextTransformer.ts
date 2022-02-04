import { Test } from "../../data/Test";
import { TestGroup } from "../../data/TestGroup";
import { TestInfo } from "../../data/TestInfo";
import { ITextTransformer } from "./ITextTransformer";

class JestTextTransformer implements ITextTransformer {
    transform(testInfo: TestInfo) : string {
        const result: string[] = [];

        this.transformGroups(testInfo.groups, 1).forEach(line => result.push(line))
        this.transformTests(testInfo.tests, 1).forEach(line => result.push(line));

        return result.join('\n')
    }
    
    private transformGroups(groups: TestGroup[], indent: number) : string[] {
        const result: string[] = [];

        groups.forEach(group => {
            result.push(`${this.printIndent(indent)}describe('${group.name}', () => {`);
            this.transformGroups(group.groups, indent + 1).forEach(line => result.push(line));
            this.transformTests(group.tests, indent + 1).forEach(line => result.push(line));
            result.push(`${this.printIndent(indent)}});`);
            
            if(groups[groups.length -1] !== group) {
                result.push('')
            }
        });

        return result;
    }

    private transformTests(tests: Test[], indent: number) : string[] {
        const result: string[] = [];

        tests.forEach(test => {
            result.push(`${this.printIndent(indent)}test('${test.name}', () => {`);
            result.push(`${this.printIndent(indent)}`);
            result.push(`${this.printIndent(indent)}});`);
        });
        

        return result;
    }

    private printIndent(indent: number) : string {
        return new Array(indent).join('  ');
    }
}

export const jestTextTransformer = new JestTextTransformer()