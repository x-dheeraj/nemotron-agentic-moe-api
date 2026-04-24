'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useReviewCycle } from '@/lib/useReviewCycle';
import styles from './ThreeDayReview.module.css';

export default function ThreeDayReview() {
    useReviewCycle('3-DAY'); // Activates auto-reset logic

    // Store reviews by date or id, but for now specific current review fields
    const [wins, setWins] = useLocalStorage<string>('review_wins', '');
    const [challenges, setChallenges] = useLocalStorage<string>('review_challenges', '');
    const [focus, setFocus] = useLocalStorage<string>('review_focus', '');
    const [lastReviewDate, setLastReviewDate] = useLocalStorage<string>('last_review_date_3-DAY', new Date().toISOString().split('T')[0]);

    const handleSave = () => {
        // Basic save acknowledgement, could expand to history list later
        const today = new Date().toISOString().split('T')[0];
        setLastReviewDate(today);
        alert('Review saved for ' + today);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>3-Day Feedback Cycle</h2>
                <p className={styles.subtitle}>Reflect on the past 3 days to optimize the next 3.</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <label className={styles.label}>🏆 Wins (Last 3 Days)</label>
                    <textarea
                        className={styles.textarea}
                        value={wins}
                        onChange={(e) => setWins(e.target.value)}
                        placeholder="What went well? What did you accomplish?"
                    />
                </div>

                <div className={styles.card}>
                    <label className={styles.label}>🚧 Challenges & Blockers</label>
                    <textarea
                        className={styles.textarea}
                        value={challenges}
                        onChange={(e) => setChallenges(e.target.value)}
                        placeholder="What didn't go as planned? Why?"
                    />
                </div>

                <div className={styles.card}>
                    <label className={styles.label}>🎯 Focus (Next 3 Days)</label>
                    <textarea
                        className={styles.textarea}
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        placeholder="What are the top 1-2 things that MUST happen?"
                    />
                </div>
            </div>

            <div className={styles.footer}>
                <span className={styles.date}>Last Review: {lastReviewDate}</span>
                <button className={styles.saveBtn} onClick={handleSave}>SUBMIT</button>
            </div>
        </div>
    );
}
