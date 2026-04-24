'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { generateTimeSlots } from '@/lib/timeUtils';
import styles from './ScheduleViews.module.css';

const DAYS = ['DAY 1', 'DAY 2', 'DAY 3'];

export default function ThreeDayView() {
    const [schedule, setSchedule] = useLocalStorage<Record<string, string>>('threeDaySchedule', {});
    const [startHour] = useLocalStorage<number>('dayStartHour', 4);
    const [endHour] = useLocalStorage<number>('dayEndHour', 22);

    const timeSlots = generateTimeSlots(startHour, endHour);

    const updateSchedule = (dayIndex: number, time: string, value: string) => {
        setSchedule(prev => ({
            ...prev,
            [`${dayIndex}-${time}`]: value
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                3-Day Schedule (Focus on Short Term Execution)
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.timeCol}>TIME</th>
                            {DAYS.map((day, i) => <th key={i}>{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, index) => (
                            <tr key={index}>
                                <td className={styles.timeCol}>{time}</td>
                                {DAYS.map((_, dayIndex) => (
                                    <td key={dayIndex}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            value={schedule[`${dayIndex}-${time}`] || ''}
                                            onChange={(e) => updateSchedule(dayIndex, time, e.target.value)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
