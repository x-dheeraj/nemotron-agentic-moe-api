'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { generateTimeSlots } from '@/lib/timeUtils';
import styles from './ScheduleViews.module.css';

export default function DailyView() {
    const [schedule, setSchedule] = useLocalStorage<Record<string, { work: string; feedback: string }>>('dailySchedule', {});
    const [startHour] = useLocalStorage<number>('dayStartHour', 4);
    const [endHour] = useLocalStorage<number>('dayEndHour', 22);

    const timeSlots = generateTimeSlots(startHour, endHour);

    const updateSchedule = (time: string, field: 'work' | 'feedback', value: string) => {
        setSchedule(prev => ({
            ...prev,
            [time]: {
                ...prev[time],
                [field]: value
            }
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                3 Daily Schedule (Schedule Tasks here, prioritise Top 3), update pending works for next day
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.timeCol}>TIME</th>
                            <th>WORKS</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, index) => (
                            <tr key={index}>
                                <td className={styles.timeCol}>{time}</td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.cellInput}
                                        placeholder="Task..."
                                        value={schedule[time]?.work || ''}
                                        onChange={(e) => updateSchedule(time, 'work', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={styles.cellInput}
                                        placeholder="Notes..."
                                        value={schedule[time]?.feedback || ''}
                                        onChange={(e) => updateSchedule(time, 'feedback', e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
