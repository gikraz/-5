import React, { useState, useEffect } from 'react';

const HiddenWordChecker = () => {
    const [hiddenWord] = useState("React");
    const [inputValue, setInputValue] = useState('');
    const [found, setFound] = useState(false);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const handleKeyPress = (event) => {
            setInputValue((prev) => prev + event.key);
        };

        const handleMouseMove = (event) => {
            setMouseCoords({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('keypress', handleKeyPress);
        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (inputValue.includes(hiddenWord)) {
            setFound(true);
        }
    }, [inputValue, hiddenWord]);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isRunning && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, time]);

    const startTimer = () => setIsRunning(true);
    const pauseTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setTime(0);
    };

    const handleDelete = () => {
        setInputValue('');
        setFound(false);
        resetTimer();
        setMessage('');
        console.log('კომპონენტი წაშლილია');
    };

    return (
        <div>
            <h1>Hidden Word Checker</h1>
            <input type="text" value={inputValue} readOnly />
            {found && <h2>Found Hidden Word: {hiddenWord}</h2>}
            <button onClick={handleDelete}>Delete</button>
            <h2>Mouse Coordinates: {`X: ${mouseCoords.x}, Y: ${mouseCoords.y}`}</h2>
            {message && <p>{message}</p>}
            <h1>Timer</h1>
            <p>{time} seconds</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={resetTimer}>Reset Timer</button>
        </div>
    );
};

export default HiddenWordChecker;
