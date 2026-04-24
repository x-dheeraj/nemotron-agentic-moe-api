'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useReviewCycle } from '@/lib/useReviewCycle';
import styles from './DailyReview.module.css';

export default function DailyReview() {
    useReviewCycle('DAILY'); // Activates auto-reset logic

    const [wins, setWins] = useLocalStorage<string>('daily_wins', '');
    const [losses, setLosses] = useLocalStorage<string>('daily_losses', '');
    const [plan, setPlan] = useLocalStorage<string>('daily_plan', '');
    const [lastReviewDate, setLastReviewDate] = useLocalStorage<string>('last_review_date_DAILY', new Date().toISOString().split('T')[0]);

    const handleSave = () => {
        const today = new Date().toISOString().split('T')[0];
        setLastReviewDate(today);
        alert('Daily Review Saved!');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Daily Feedback</h2>
                <p className={styles.subtitle}>Win the day. Prepare for tomorrow.</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <label className={styles.label}>🌟 Wins (Today)</label>
                    <textarea
                        className={styles.textarea}
                        value={wins}
                        onChange={(e) => setWins(e.target.value)}
                        placeholder="What went well today?"
                    />
                </div>

                <div className={styles.card}>
                    <label className={styles.label}>📉 Improvements</label>
                    <textarea
                        className={styles.textarea}
                        value={losses}
                        onChange={(e) => setLosses(e.target.value)}
                        placeholder="What could have been better?"
                    />
                </div>

                <div className={styles.card}>
                    <label className={styles.label}>🚀 Plan (Tomorrow)</label>
                    <textarea
                        className={styles.textarea}
                        value={plan}
                        onChange={(e) => setPlan(e.target.value)}
                        placeholder="Top priority for tomorrow?"
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.date}>Date: {new Date().toLocaleDateString()}</span>
                <button className={styles.saveBtn} onClick={handleSave}>SUBMIT</button>
            </div>
        </div>
    );
}
