import { useState, useCallback } from 'react';
import Question from './Question.jsx';
import Summary from './Summary.jsx';


import QUESTIONS from '../questions.js';

export default function Quiz()
{
    const [userAnswers, setUserAnswers] = useState([]); 

    const activeQuestionIndex = userAnswers.length;
    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer)
    {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })

    }, [])

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer])


    if(isQuizCompleted)
    {
        return <Summary userAnswers={userAnswers}/>
    }

    return (
        <div id="quiz">
            <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer}/>
        </div>

    )
}