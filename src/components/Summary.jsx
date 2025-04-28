import logo from '../assets/quiz-complete.png';
import { questions, answers } from '../QuizData.js';

let correctPerc =  undefined;
let incorrectPerc =  undefined;
let skippedPerc =  undefined;

// A Summary Component that displays and calculates quizk results and statistics
// A detailed summary of quiz results including statistics and answers 
export default function Summary()
{

function getAnswers() // Retrives user answers from Local Storage
{
    return JSON.parse(localStorage.getItem("userAnswers"));
}

function calculatePerc() // Calculate percentages for quiz results
{
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let skipped = 0;

    questions.map((question, i) => {
        if(userAnswers[i] === answers[i])
        {
            correctAnswers++;
        }
        else if(userAnswers[i] === null)
        {
            skipped++;
        }
        else
        {
            incorrectAnswers++;
        }
    })

    // The necessarry calculations for the statistics
    correctPerc = Math.floor(correctAnswers / questions.length * 100); // Part / Whole * 100
    incorrectPerc = Math.floor(incorrectAnswers / questions.length * 100);
    skippedPerc = Math.floor(skipped / questions.length * 100);
}

    const userAnswers = getAnswers();
    calculatePerc();

    return (
        <div id="summary">
            <img src={logo} alt="Completion Logo" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{skippedPerc}%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">{correctPerc}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{incorrectPerc}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            {questions.map((question, i) => {

                let isCorrect = answers[i] === userAnswers[i];

                return (
                    <ol key={i + 1}>
                        <h3>{i + 1}</h3>
                        <li className="question">{question}</li>
                        <li className={`user-answer ${isCorrect ? "correct" : "wrong"}`}>{userAnswers[i]}</li>
                    </ol>
                )
            })}
        </div>
    )
}