'use client';

import React, { useState, useEffect } from 'react';
import styles from './FocusTimer.module.css';

export default function FocusTimer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsActive(false);
                        clearInterval(interval);
                        // Optional: Play sound
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className={styles.container}>
            <div className={styles.timerDisplay}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <div className={styles.controls}>
                <button className={styles.button} onClick={toggleTimer}>
                    {isActive ? '⏸' : '▶'}
                </button>
                <button className={styles.button} onClick={resetTimer}>
                    ↺
                </button>
            </div>
        </div>
    );
}
