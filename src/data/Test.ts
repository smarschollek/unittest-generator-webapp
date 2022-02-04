export type Test = {
    name: string;
};

export const createTest = (name : string) : Test => {
    return {
        name
    }
}
