import QuizTimer from './QuizTimer';
import Answers from './Answers';

export default function Question({questionText, answers, selectedAnswer, answerState, onSelectAnswer, onSkipAnswer})
{
    return (
        <div id="question">
            <QuizTimer timeout={10000} onTimeout={onSkipAnswer}/>
            <h2>{questionText}</h2>
            <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelectAnswer}/>
        </div>
    )
}