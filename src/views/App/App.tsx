import { useState } from "react"
import { testInfoGenerator } from "../../services/TestInfoGenerator/TestInfoGenerator";
import { jestTextTransformer } from "../../services/TextTransformer/JestTextTransformer";
import Textarea from "./components/Textarea";

const demoContent = `#<Component/>
-should render

## when button is clicked
- should trigger onClick handle in props
- should switch button state to loading

## when combobox is loaded
- should show first entry
`;

const App = () => {
    const [content, setContent] = useState(demoContent);

    return(
        <div className="container mx-auto h-screen">
            <div className="columns-2 h-full">
                <div className="w-full h-full p-5">
                    <Textarea 
                        value={content}
                        onChange={setContent}/>
                </div>
                <div className="w-full h-full p-5">
                    <Textarea
                        value={jestTextTransformer.transform(testInfoGenerator.parse(content))}/>
                </div>
            </div>
            
        </div>
    )
}
export default App