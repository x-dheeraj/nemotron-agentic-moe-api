'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { generateTimeSlots } from '@/lib/timeUtils';
import styles from './ScheduleViews.module.css';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']; // 7 days
const COLS = [...DAYS]; // 7 columns total

export default function WeeklyView() {
    const [data, setData] = useLocalStorage<Record<string, string>>('weeklySchedule', {});

    // Full 24h cycle: 0 to 23
    const timeSlots = generateTimeSlots(0, 23);

    const updateData = (time: string, colIndex: number, value: string) => {
        setData(prev => ({ ...prev, [`${time}-${colIndex}`]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                3 Weekly Schedule (Schedule Tasks here, prioritise Top 3), set friday as day to prep schedule
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.timeCol}>TIME</th>
                            {DAYS.map(day => <th key={day}>{day}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time) => (
                            <tr key={time}>
                                <td className={styles.timeCol}>{time}</td>
                                {/* 7 Days */}
                                {COLS.map((_, colIndex) => (
                                    <td key={colIndex}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            value={data[`${time}-${colIndex}`] || ''}
                                            onChange={(e) => updateData(time, colIndex, e.target.value)}
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
