import { useState, useCallback } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';
import QuizTimer from './QuizTimer.jsx';
import Answers from './Answers.jsx';

import QUESTIONS from '../questions.js';

export default function Quiz()
{
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]); 

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1; 
    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer)
    {
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        })

        setTimeout(() => {
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0])
            {
                setAnswerState("correct");
            }
            else
            {
                setAnswerState("wrong");
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000)

    }, [activeQuestionIndex])

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
            <Question key={activeQuestionIndex} questionText={QUESTIONS[activeQuestionIndex].text} answers={[...QUESTIONS[activeQuestionIndex].answers]} selectedAnswer={userAnswers[userAnswers.length - 1]} answerState={answerState} onSelectAnswer={handleSelectAnswer} onSkipAnswer={handleSkipAnswer}/>
        </div>

    )
}