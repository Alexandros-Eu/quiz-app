import { useState, useCallback, useEffect } from 'react';

/**
 * A progress bar component that provides a visual countdown timer
 * @param {number} timer - Duration in ms for the countdown
 * @param {function} timeUp - Function that moves to the next questions and gets executed when timer reaches 0 
 * @returns {JSX.element} Progress bar element that updates every 100 ms
 */
export default function ProgressBar({timer, timeUp})
{
    // State tracks remaining time in ms
    const [timeRemaining, setTimeRemaining] = useState(timer);

    // Updates state with external timer prop changes
    useEffect(() => {
        setTimeRemaining(timer);
    }, [timer]);

    // Updates remaining time every tick (100ms)
    // Utilizing useCallback to avoid a re-rendering infinite loop
    const passageOfTime = useCallback(function passageOfTime()
    {
        setTimeRemaining(prevTime => timeRemaining <= 0 ? 0 : prevTime - 100);  // If there is still time left subtract 100ms otherwise apply 0 in order to activate break condition
    }, []);

    // Applies a 'tick' like effect (like a clock) using passageOfTime
    useEffect(() => {   
        // If time runs out update state for the following question and execute timeUp() that moves to the next question
        if(timeRemaining <= 0)  
        {
            setTimeRemaining(timer);
            timeUp();
            return;
        }

        // 'ticks' every 100ms
        const intervalID = setInterval(() => {
            passageOfTime();
        }, 100)

        // Cleanup interval on unmount or when dependencies change
        return () => {
            clearInterval(intervalID); 
        }
    }, [passageOfTime, timeRemaining])

    return (
        // Applies 'answered' class only for 2-second timers (quiz answered state)
        <progress className={timer === 2000 ? "answered" : null} value={timeRemaining} max={timer}/>
    )
}