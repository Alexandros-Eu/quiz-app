export default function Answer({answer, onAnswerClick, isSelected, isCorrect, isDisabled, potentialAnswerNo})
{
    function handleAnswerSelect(answer)
    {
        onAnswerClick(answer, true, potentialAnswerNo);
    }

    let style;

    if(isSelected && isCorrect === undefined)
    {
        style = "selected";
    }
    else if(!isSelected && isCorrect === undefined)
    {
        style = "";
    }
    else if(isCorrect)
    {
        style = "correct";
    }
    else if(isCorrect === false)
    {
        style = "wrong"
    }
    else if(isCorrect === undefined)
    {
        style = "";
    }
    else
    {
        style = "";
    }

    return (
        <div className="answer">
            <button className={style} onClick={() => handleAnswerSelect(answer)} disabled={isDisabled}>{answer}</button>
        </div>
    )
}