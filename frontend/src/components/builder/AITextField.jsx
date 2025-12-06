import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
function AITextField({description, onUpdate}) {
    const [showAIResponse, setshowAIResponse] = useState(false)
    const [fieldData, setFieldData] = useState({userText:description.userText, aiText:description?.aiText || ""});
    const [loading, setLoading] = useState( false);
    const sendRequestToAi =async () => {
        setLoading(true);
        await delay();
        const newData = { ...fieldData, aiText: "optimized text" };
        setFieldData(newData)
        toggleResponse();
        onUpdate?.(newData)
        setLoading(false);
    }
    
   // Debounce userText updates
    useEffect(() => {
        const timer = setTimeout(() => {
            onUpdate?.(fieldData);
        }, 1000); // 300ms debounce
        return () => clearTimeout(timer); // cleanup on next change
    }, [fieldData, onUpdate]);

    const delay= async()=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve()
            },10000);
        })
    }
    const handleChange=(element)=>{
        if(!showAIResponse){
            const value=element.target.value;
            const newData= {...fieldData , userText:value}
            setFieldData(newData) 
        }
    }
    
    const toggleResponse = ()=>{
        setshowAIResponse((prev)=>!prev);
    }
    
    return(
        <div className='ai-Text-field'>
            {loading && "AI Processing Data "}
            <textarea value={showAIResponse? fieldData.aiText : fieldData.userText} minLength={100} onChange={handleChange}></textarea>
            <button onClick={toggleResponse} disabled={loading}>{showAIResponse? "Show AI Content" : "Show User Content"}</button>
            <button onClick={sendRequestToAi} disabled={loading}>Optimize Content</button>
        </div>
    )


}

export default AITextField
