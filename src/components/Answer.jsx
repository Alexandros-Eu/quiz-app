export default function Answer({answer, onAnswerClick, isSelected, isCorrect, isDisabled, potentialAnswerNo})
{
    function handleAnswerSelect(answer)
    {
        onAnswerClick(answer, true, potentialAnswerNo);
    }

    function getStyle(selected, correct)
    {
        if(selected && correct === undefined) return 'selected';
        if(isCorrect === true) return 'correct';
        if(isCorrect === false) return 'wrong';

        return '';
    }

    return (
        <div className="answer">
            <button className={getStyle(isSelected, isCorrect)} onClick={() => handleAnswerSelect(answer)} disabled={isDisabled}>{answer}</button>
        </div>
    )
}