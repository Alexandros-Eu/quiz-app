import { useState, useCallback } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';
import QuizTimer from './QuizTimer.jsx';
import Answers from './Answers.jsx';

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
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy logo" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    return (
        <div id="quiz">
            <Question key={activeQuestionIndex} questionIndex={activeQuestionIndex} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer}/>
        </div>

    )
}