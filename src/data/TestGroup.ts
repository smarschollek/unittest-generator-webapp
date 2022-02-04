import { Test } from "./Test";


export type TestGroup = {
    name: string;
    groups: TestGroup[];
    tests: Test[];
};

export const createTestGroup = (name : string) : TestGroup => {
    return {
        name,
        groups: [],
        tests: [],
    };
}
