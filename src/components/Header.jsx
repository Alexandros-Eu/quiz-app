import logo from '../assets/quiz-logo.png';

// A Header Component stylizing the Quiz App by displaying the quiz logo and title
export default function Header()    
{
    return (
        <header>
            <img src={logo} alt="Quiz Logo" />
            <h1>ReactQuiz</h1>
        </header>
    )
}