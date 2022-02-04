import { useState } from "react"
import { jestTextTransformer } from "../../services/JestTextTransformer";
import { testInfoGenerator } from "../../services/TestInfoGenerator";
import Textarea from "./components/Textarea";

const App = () => {
    const [content, setContent] = useState('');

    return(
        <div className="container mx-auto h-screen">
            <div className="columns-2 bg-lime-500 h-full">
                <div className="w-full h-full p-5">
                    <Textarea 
                        onChange={setContent}
                    />
                </div>
                <div className="w-full h-full p-5">
                    <Textarea
                        value={jestTextTransformer.transform(testInfoGenerator.parse(content))}
                    />
                </div>
            </div>
            
        </div>
    )
}
export default App