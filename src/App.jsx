import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import Question from './components/Question.jsx';
import Answer from './components/Answer.jsx';
import { questions, potentialAnswers, answers as correctAnswers } from './QuizData.js';

const QUIZ_TIMER = 10000;

function App()
{
    const [questionFlag, setQuestionFlag] = useState(0);
    const [potentialAnswerFlag, setPotentialAnswerFlag] = useState(undefined);
    const [question, setQuestion] = useState(questions[questionFlag]);
    const [answers, setAnswers] = useState(potentialAnswers[questionFlag]);
    const [isCorrect, setIsCorrect] = useState(undefined);
    // const [isSelected, setIsSelected] = useState(undefined);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    function handleAnswerSelect(answer, disabled, answerNumber)
    {
        setPotentialAnswerFlag(answerNumber);
        setButtonsDisabled(disabled);

        // console.log(questions.length);

        // if(questionFlag < questions.length)
        // {
        //     setQuestionFlag(prevFlag => prevFlag + 1);
        //     setQuestion(questions[questionFlag + 1]);
        //     setAnswers(potentialAnswers[questionFlag + 1]);
        // }

        // setIsSelected(true);
        // answer === correctAnswers[questionFlag] ? setIsCorrect(true) : setIsCorrect(false);

    }

    return (
        <>
            <Header/>
            <div id="quiz">
                <div id="question">
                    
                </div>
                <Question questionText={question} timer={QUIZ_TIMER} />

                <div id="answers">
                    {answers.map((potentialAnswer, i) => {
                        let disabled = buttonsDisabled && potentialAnswerFlag !== i;
                        let isSelected = potentialAnswerFlag === i;
                        return <Answer key={uuidv4()} answer={potentialAnswer} onAnswerClick={handleAnswerSelect} isSelected={isSelected} correct={isCorrect} isDisabled={disabled} potentialAnswerNo={i}/>
                    })}
                </div>
            </div>

            
        </>
    )
}

export default App;
