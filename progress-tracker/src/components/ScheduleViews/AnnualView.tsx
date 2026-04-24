'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import styles from './ScheduleViews.module.css';

const QUARTERS = ['Q1 (J-F-M)', 'Q2 (A-M-J)', 'Q3 (J-A-S)', 'Q4 (O-N-D)'];
const ROWS = ['Big Win:', 'Key Project:', 'Metric:', 'Learnings:'];

export default function AnnualView() {
    const [data, setData] = useLocalStorage<Record<string, string>>('annual', {});

    const updateData = (row: string, quarter: string, value: string) => {
        setData(prev => ({ ...prev, [`${row}-${quarter}`]: value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                3 Annual Schedule (High Level Vision)
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.timeCol}>FOCUS</th>
                            {QUARTERS.map(q => <th key={q}>{q}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS.map((row) => (
                            <tr key={row}>
                                <td className={styles.timeCol}>{row}</td>
                                {QUARTERS.map((q) => (
                                    <td key={q}>
                                        <input
                                            type="text"
                                            className={styles.cellInput}
                                            value={data[`${row}-${q}`] || ''}
                                            onChange={(e) => updateData(row, q, e.target.value)}
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
