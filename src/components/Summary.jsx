import logo from '../assets/quiz-complete.png';
import { questions, answers } from '../QuizData.js';

function getAnswers()
{
    return JSON.parse(localStorage.getItem("userAnswers"));
}

export default function Summary()
{
    const userAnswers = getAnswers();

    return (
        <div id="summary">
            <img src={logo} alt="Completion Logo" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">0%</span>
                    <span className="text">skipped</span>
                </p>
                <p>
                    <span className="number">43%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">57%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            {questions.map((question, i) => {

                let isCorrect = answers[i] === userAnswers[i];

                return (
                    <ol>
                        <h3>{i + 1}</h3>
                        <li className="question">{question}</li>
                        <li className={`user-answer ${isCorrect ? "correct" : "wrong"}`}>{userAnswers[i]}</li>
                    </ol>
                )
            })}
        </div>
    )
}