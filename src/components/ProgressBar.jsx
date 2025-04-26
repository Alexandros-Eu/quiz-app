import { useState, useCallback, useEffect } from 'react';

export default function ProgressBar({timer, timeUp})
{
    const [timeRemaining, setTimeRemaining] = useState(timer);

    useEffect(() => {
        setTimeRemaining(timer);
    }, [timer]);

    const passageOfTime = useCallback(function passageOfTime()
    {
        setTimeRemaining(prevTime => timeRemaining <= 0 ? 0 : prevTime - 100);
    }, []);

    useEffect(() => {
        if(timeRemaining <= 0)
        {
            setTimeRemaining(timer);
            timeUp();
            return;
        }

        const intervalID = setInterval(() => {
            passageOfTime();
        }, 100)

        return () => {
            clearInterval(intervalID);
        }
    }, [passageOfTime, timeRemaining])

    return (
        <progress className={timer === 2000 ? "answered" : null} value={timeRemaining} max={timer}/>
    )
}