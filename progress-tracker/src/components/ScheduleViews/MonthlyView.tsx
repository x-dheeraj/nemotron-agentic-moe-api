'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import styles from './ScheduleViews.module.css';

const WEEKS = ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4', 'EXTRA DAYS'];
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function MonthlyView() {
    const [data, setData] = useLocalStorage<Record<string, string>>('monthlySchedule', {});

    const updateData = (day: string, week: string, value: string) => {
        setData(prev => ({ ...prev, [`${day}-${week}`]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                MONTHLY SCHEDULE (Schedule Tasks here, prioritise Top 3)
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.timeCol}></th>
                            {WEEKS.map(w => <th key={w}>{w}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {DAYS.map((day) => (
                            <tr key={day}>
                                <td className={styles.timeCol}>{day}</td>
                                {WEEKS.map((w) => (
                                    <td key={w}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            value={data[`${day}-${w}`] || ''}
                                            onChange={(e) => updateData(day, w, e.target.value)}
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
