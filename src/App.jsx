import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Question from './components/Question.jsx';
import Answer from './components/Answer.jsx';
import Summary from './components/Summary.jsx';
import { questions, potentialAnswers, answers as correctAnswers } from './QuizData.js';

const QUIZ_TIMER = 10000;
const PICKED_TIMER = 2000;
const RESULT_TIMER = 3000;

function App()
{
    const [questionFlag, setQuestionFlag] = useState(0);
    const [pickedAnswerFlag, setPickedAnswerFlag] = useState(undefined);
    const [question, setQuestion] = useState(questions[questionFlag]);
    const [answers, setAnswers] = useState(potentialAnswers[questionFlag]);
    const [isAnAnswerSelected, setIsAnAnswerSelected] = useState(undefined);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [showChoice, setShowChoice] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isQuizOver, setIsQuizOver] = useState(false);

    function handleAnswerSelect(answer, disabled, answerNumber)
    {
        setPickedAnswerFlag(answerNumber);
        setButtonsDisabled(disabled);
        setIsAnAnswerSelected(true);

        setUserAnswer(answer);
        saveAnswer(answer);

    }

    function handleSkipSelect()
    {
        saveAnswer();
        nextQuestion();
    }

    function saveAnswer(answer = null)
    {
        if(questionFlag === 0)
        {
            localStorage.clear();
        }

        let allUserAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
        localStorage.setItem("userAnswers", JSON.stringify([...allUserAnswers, answer]));

    }

    function nextQuestion()
    {
        if(questionFlag < questions.length - 1)
        {
            setQuestionFlag(prevFlag => prevFlag + 1);
            setQuestion(questions[questionFlag + 1]);
            setAnswers(potentialAnswers[questionFlag + 1]);

            setPickedAnswerFlag(undefined);
            setButtonsDisabled(false);
            setIsAnAnswerSelected(undefined);
            setShowChoice(false);
            setShowResult(false);
            
            setUserAnswer("");

            appTimer = QUIZ_TIMER;
        }
        else 
        {
            setIsQuizOver(true);
        }
    }

    useEffect(() => {
        let timer;
        if(isAnAnswerSelected && !showChoice) 
        {
            timer = setTimeout(() => {
                setShowChoice(true);
            }, PICKED_TIMER);
        }
        
        return () => clearTimeout(timer);
    }, [isAnAnswerSelected]);

    useEffect(() => {
        let timer;
        if(showChoice)
        {
            timer = setTimeout(() => {
                setShowResult(true);
            }, RESULT_TIMER)
        }

        return () => clearTimeout(timer);

    }, [showChoice])

    useEffect(() => {
        let timer;
        if(showResult)
        {
            timer = setTimeout(() => {
                nextQuestion();
            }, 0)
        }

        return () => clearTimeout(timer);
    }, [showResult])
    

    let appTimer = QUIZ_TIMER;

    if(isAnAnswerSelected)
    {
        appTimer = PICKED_TIMER;
    }

    if(showChoice)
    {
        appTimer = RESULT_TIMER;
    }

    return (
        isQuizOver ? (
            <>
                <Summary/>
            </>
        ) : (
            <>
                <Header/>
                <div id="quiz">
                    <div id="question">
                        <ProgressBar timer={appTimer} timeUp={handleSkipSelect}/>
                        <Question questionText={question} />
                    </div>


                    <div id="answers">
                        {answers.map((potentialAnswer, i) => {

                            let disabled = buttonsDisabled && pickedAnswerFlag !== i;
                            let isSelected = pickedAnswerFlag === i;
                            let isCorrect = undefined;

                            if (isSelected && showChoice) {
                                isCorrect = userAnswer === correctAnswers[questionFlag];
                            }

                            return <Answer key={uuidv4()} answer={potentialAnswer} onAnswerClick={handleAnswerSelect} isSelected={isSelected} isCorrect={isCorrect} isDisabled={disabled} potentialAnswerNo={i}/>
                        })}

                        {!isAnAnswerSelected && !showChoice && !showResult && (
                            <div id="skip-action">
                                <button onClick={handleSkipSelect}>Skip</button>
                            </div>
                        )}
                    </div>
                </div>            
            </>
        )
    )
}

export default App;
