import { TestInfo } from "../data/TestInfo";

export interface ITextTransformer {
    transform(testInfo: TestInfo) : string
}