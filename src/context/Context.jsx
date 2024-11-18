import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => { 
     setTimeout(function () {
        setResultData(prev=>prev+nextWord)
     }, 75*index);
    }

    const newChat = () => { 
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
    
        let response = "";
        if(prompt !== undefined) { 
            response = await run(prompt);     
            setRecentPrompt(prompt)
        }
        else { 
            setPreviousPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input);     
        }
    
        response = response.trim();
        const responseArray = response.split("**").filter(Boolean);
    
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            const segment = responseArray[i];
            if (segment) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += segment;
                } else {
                    newResponse += `<b>${segment}</b>`;
                }
            }
        }
    
        const formattedResponse = newResponse.split("*").join("</br>");
        const newResponseArray = formattedResponse.split(" ");
    
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            if (nextWord) {
                delayPara(i, nextWord + " ");
            }
        }
    
        setLoading(false);
        setInput("");
    };
    
    
    const ContextValue = {
        previousPrompts,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
