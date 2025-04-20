import { useState } from 'react';

export default function Answer({answer, onAnswerClick, isSelected, correct, isDisabled, potentialAnswerNo})
{
    const [btnStyle, setBtnStyle] = useState("");

    function handleAnswerSelect(answer)
    {
        setBtnStyle("selected");
        onAnswerClick(answer, true, potentialAnswerNo);

    }

    let style = ""


    // if(selected)
    // {
    //     buttonStyle = "selected"
    // }

    if(correct === true)
    {
        buttonStyle = "correct";
    }
    else if(correct === false)
    {
        buttonStyle = "wrong";
    }
    


    return (
        <div className="answer">
            <button className={isSelected ? "selected" : null} onClick={() => handleAnswerSelect(answer)} disabled={isDisabled}>{answer}</button>
        </div>
    )
}