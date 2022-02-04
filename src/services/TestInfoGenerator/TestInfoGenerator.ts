import { createTest } from "../../data/Test";
import { TestGroup, createTestGroup } from "../../data/TestGroup";
import { TestInfo } from "../../data/TestInfo";

class TestInfoGenerator {
    parse(text: string) : TestInfo {
        const result : TestInfo = {
            groups: [],
            tests: []
        };

        const lines = text.split('\n')        
        let groupIndex = -1;
        let currentActiveGroup : TestGroup;
        
        const parents : { [key: number] : TestGroup } = {};

        lines.forEach(line => {
            const newGroupIndex = this.getGroupIndex(line);
            if(newGroupIndex !== 0) {
                if(newGroupIndex === 1) {
                    const newTestGroup = createTestGroup(line.replaceAll('#','').trim())
                    result.groups.push(newTestGroup);
                    parents[1] = newTestGroup;
                    currentActiveGroup = newTestGroup;
                } else {
                    const newTestGroup = createTestGroup(line.replaceAll('#','').trim())
                    if(parents[newGroupIndex - 1]) {
                        parents[newGroupIndex - 1].groups.push(newTestGroup);
                        parents[newGroupIndex] = newTestGroup;
                    }

                    currentActiveGroup = newTestGroup;
                }
                
                groupIndex = newGroupIndex;
            }

            if(line === '') {
                groupIndex = -1;
            }

            if(line.startsWith('-')) {
                if(groupIndex === -1) {
                    result.tests.push(createTest(line.substring(1).trim()));
                }
                else {
                    currentActiveGroup.tests.push(createTest(line.substring(1).trim()));
                }                
            }
        })
        

        return result
    }



    private getGroupIndex(line: string) : number {
        return (line.match(new RegExp("#", "g")) || []).length
    }
}

export const testInfoGenerator = new TestInfoGenerator();