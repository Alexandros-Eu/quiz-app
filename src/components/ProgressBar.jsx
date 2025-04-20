import { useState, useCallback, useEffect } from 'react';

export default function ProgressBar({timer})
{
    const [timeRemaining, setTimeRemaining] = useState(timer);

    const passageOfTime = useCallback(function passageOfTime()
    {
        setTimeRemaining(prevTime => timeRemaining <= 0 ? 0 : prevTime - 100);
    }, []);

    useEffect(() => {
        if(timeRemaining <= 0)
        {
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
        <progress value={timeRemaining} max={timer}/>
    )
}