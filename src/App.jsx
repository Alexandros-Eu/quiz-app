import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Question from './components/Question.jsx';
import Answer from './components/Answer.jsx';
import Summary from './components/Summary.jsx';
import { questions, potentialAnswers, answers as correctAnswers } from './QuizData.js';

// Timer constants (in ms)
const QUIZ_TIMER = 10000;
const PICKED_TIMER = 2000;
const RESULT_TIMER = 3000;

/**
 * Main Quiz Application
 * Manages the flow, user interactions and state transitions
 * 
 * Flow: Question Display -> Answer Selection -> Show Choice -> Show Result -> Next Question
 */
function App()
{
    // Question management states
    const [questionFlag, setQuestionFlag] = useState(0); // The Question #
    const [question, setQuestion] = useState(questions[questionFlag]); // Picking the Question using the Question Flag
    const [answers, setAnswers] = useState(potentialAnswers[questionFlag]); // Picking the Potential Answers using the Question Flag

    // Answer management states
    const [pickedAnswerFlag, setPickedAnswerFlag] = useState(undefined); //  The Answer No that was picked
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");

    // Quiz flow states
    const [isAnAnswerSelected, setIsAnAnswerSelected] = useState(undefined);
    const [showChoice, setShowChoice] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isQuizOver, setIsQuizOver] = useState(false);


    /**
     * Handles quizk state transitions based on timer events
     */

    // side effect for when an an answer is selected
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

    // side effect for when a choice is displayed
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

    // side effect for when a result is displayed
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

    /**
     * Handles user answer selection and updates quiz state
     * @param {string} answer - The selected answer 
     * @param {boolean} disabled - Whether to disable the other answer options
     * @param {number} answerNumber - Index # of the selected answer
     */
    function handleAnswerSelect(answer, disabled, answerNumber)
    {
        setPickedAnswerFlag(answerNumber);
        setButtonsDisabled(disabled); // Disable the rest of the answers
        setIsAnAnswerSelected(true);

        setUserAnswer(answer);
        saveAnswer(answer); // Saves the answer 

    }

    function handleSkipSelect() // Handles the logic when skipping a question
    {
        saveAnswer(); // Saving a null answer 
        nextQuestion(); // Moving to next question
    }

    function saveAnswer(answer = null) // Saves the user's answer to local storage
    {
        if(questionFlag === 0) // If we are on 1st Question clear all previous data
        {
            localStorage.clear();
        }

        let allUserAnswers = JSON.parse(localStorage.getItem("userAnswers")) || [];
        localStorage.setItem("userAnswers", JSON.stringify([...allUserAnswers, answer]));

    }

    function nextQuestion() // Moves to next question
    {
        if(questionFlag < questions.length - 1) // as long as we do not exceed the number of Questions
        {
            setQuestionFlag(prevFlag => prevFlag + 1);
            setQuestion(questions[questionFlag + 1]);
            setAnswers(potentialAnswers[questionFlag + 1]);

            // Resets all question-related states for the new question
            setPickedAnswerFlag(undefined);
            setButtonsDisabled(false);
            setIsAnAnswerSelected(undefined);
            setShowChoice(false);
            setShowResult(false);
            
            setUserAnswer("");

            appTimer = QUIZ_TIMER;
        }
        else // if we exceed the limit
        {
            setIsQuizOver(true); // we end the Quiz
        }
    }

    // Assigns the correct timer for the ProgressBar according to state and the side effects
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

                            let disabled = buttonsDisabled && pickedAnswerFlag !== i; // disabled all other options if buttonsDisabled = true and it's not the picked option
                            let isSelected = pickedAnswerFlag === i; // If it's the picked answer
                            let isCorrect = undefined;

                            if (isSelected && showChoice) {
                                isCorrect = userAnswer === correctAnswers[questionFlag]; // If the user answer matches with the correct answers data
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
