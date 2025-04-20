import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Question from './components/Question.jsx';
import Answer from './components/Answer.jsx';
import { questions, potentialAnswers, answers as correctAnswers } from './QuizData.js';

const QUIZ_TIMER = 10000;

function App()
{
    const [questionFlag, setQuestionFlag] = useState(0);
    const [pickedAnswerFlag, setPickedAnswerFlag] = useState(undefined);
    const [question, setQuestion] = useState(questions[questionFlag]);
    const [answers, setAnswers] = useState(potentialAnswers[questionFlag]);
    const [isCorrect, setIsCorrect] = useState(undefined);
    const [isAnAnswerSelected, setIsAnAnswerSelected] = useState(undefined);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);

    function handleAnswerSelect(answer, disabled, answerNumber)
    {
        setPickedAnswerFlag(answerNumber);
        setButtonsDisabled(disabled);
        setIsAnAnswerSelected(true);

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

    let timer = QUIZ_TIMER;

    if(isAnAnswerSelected)
    {
        timer = 2000;
    }

    return (
        <>
            <Header/>
            <div id="quiz">
                <div id="question">
                    <ProgressBar timer={timer}/>
                    <Question questionText={question} />
                </div>


                <div id="answers">
                    {answers.map((potentialAnswer, i) => {
                        let disabled = buttonsDisabled && pickedAnswerFlag !== i;
                        let isSelected = pickedAnswerFlag === i;
                        return <Answer key={uuidv4()} answer={potentialAnswer} onAnswerClick={handleAnswerSelect} isSelected={isSelected} correct={isCorrect} isDisabled={disabled} potentialAnswerNo={i}/>
                    })}
                </div>
            </div>

            
        </>
    )
}

export default App;
