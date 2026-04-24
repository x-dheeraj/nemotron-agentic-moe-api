'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import styles from './ScheduleViews.module.css';

const MONTHS = ['MONTH 1', 'MONTH 2', 'MONTH 3', 'MONTH 4', 'MONTH 5', 'MONTH 6'];
const ROWS = ['Goal:', 'Metric:', 'Review:', 'Notes:'];

export default function HalfYearlyView() {
    const [data, setData] = useLocalStorage<Record<string, string>>('halfYearly', {});

    const updateData = (row: string, month: string, value: string) => {
        setData(prev => ({ ...prev, [`${row}-${month}`]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                3 Half-Yearly Schedule (Strategic Goals & Milestones)
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.timeCol}>CATEGORY</th>
                            {MONTHS.map(m => <th key={m}>{m}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS.map((row) => (
                            <tr key={row}>
                                <td className={styles.timeCol}>{row}</td>
                                {MONTHS.map((m) => (
                                    <td key={m}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            value={data[`${row}-${m}`] || ''}
                                            onChange={(e) => updateData(row, m, e.target.value)}
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
