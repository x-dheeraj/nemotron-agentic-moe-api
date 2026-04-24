'use client';

import React from 'react';
import styles from './AnalyticsDashboard.module.css';
import { useLocalStorage } from '@/lib/useLocalStorage';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface Habit {
    id: string;
    text: string;
    streak: number;
    completedToday: boolean;
}

interface AnalyticsDashboardProps {
    onClose: () => void;
}

export default function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
    const [brainDumpTasks] = useLocalStorage<Task[]>('brainDumpTasks', []);
    const [top3Tasks] = useLocalStorage<Task[]>('top3Tasks', []);
    const [habits] = useLocalStorage<Habit[]>('habits', []);

    // Calculate Metrics
    const completedTasks = brainDumpTasks.filter(t => t.completed).length + top3Tasks.filter(t => t.completed).length;
    const totalTasks = brainDumpTasks.length + top3Tasks.length;
    const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const activeHabits = habits.length;
    const currentStreaks = habits.reduce((acc, h) => acc + h.streak, 0);
    const avgStreak = activeHabits > 0 ? (currentStreaks / activeHabits).toFixed(1) : 0;

    const perfectDay = top3Tasks.every(t => t.completed && t.text !== '');

    return (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Productivity Analytics</h2>
                    <button className={styles.closeParams} onClick={onClose}>&times;</button>
                </div>

                <div className={styles.content}>
                    {/* Completion Rate Card */}
                    <div className={styles.card}>
                        <span className={styles.cardTitle}>Daily Completion</span>
                        <span className={styles.cardValue}>{taskCompletionRate}%</span>
                        <span className={styles.cardSub}>{completedTasks} / {totalTasks} tasks done today</span>
                    </div>

                    {/* Perfect Day Card */}
                    <div className={styles.card}>
                        <span className={styles.cardTitle}>Daily Status</span>
                        <span className={styles.cardValue} style={{ color: perfectDay ? '#4CAF50' : '#FFC107' }}>
                            {perfectDay ? 'Perfect' : 'In Progress'}
                        </span>
                        <span className={styles.cardSub}>{perfectDay ? 'All Top 3 Priorities Done!' : 'Keep pushing on Top 3!'}</span>
                    </div>

                    {/* Habits Card */}
                    <div className={styles.card}>
                        <span className={styles.cardTitle}>Habit Consistency</span>
                        <span className={styles.cardValue} style={{ color: '#2196F3' }}>{avgStreak}</span>
                        <span className={styles.cardSub}>Average day streak across {activeHabits} habits</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
