/**
 * An answer Component that provides a potential answer to a question
 * @param {string} answer - The text content of the answer 
 * @param {function} onAnswerClick - Callback function triggered when answer is selected
 * @param {boolean} isSelected - Whether this answer is currently selected
 * @param {boolean} isCorrect - Whether this answer is correct [undefined if not yet evaluated]
 * @param {boolean} isDisabled - Whether this answer button should be disabled
 * @param {int} potentialAnswerNo - The # index of this answer in the potential answer list 
 * @returns {JSX.element} - A button wrapped in a div with the appropriate styling
 */
export default function Answer({answer, onAnswerClick, isSelected, isCorrect, isDisabled, potentialAnswerNo})
{
    function handleAnswerSelect(answer) // Handles the answer selection event
    {
        onAnswerClick(answer, true, potentialAnswerNo);
    }

    function getStyle(selected, correct) // Determines the CSS blass based on answer state
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