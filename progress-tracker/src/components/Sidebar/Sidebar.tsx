'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import styles from './Sidebar.module.css';

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

export default function Sidebar() {
    const [brainDumpTasks, setBrainDumpTasks] = useLocalStorage<Task[]>('brainDumpTasks',
        Array.from({ length: 10 }, (_, i) => ({ id: i, text: '', completed: false }))
    );
    const [top3Tasks, setTop3Tasks] = useLocalStorage<Task[]>('top3Tasks',
        Array.from({ length: 3 }, (_, i) => ({ id: i, text: '', completed: false }))
    );

    // New Habit Tracker State
    const [habits, setHabits] = useLocalStorage<Habit[]>('habits', [
        { id: 'h1', text: 'Workout', streak: 0, completedToday: false },
        { id: 'h2', text: 'Read 30m', streak: 0, completedToday: false },
        { id: 'h3', text: 'Drink Water', streak: 0, completedToday: false },
    ]);

    const toggleTask = (tasks: Task[], setTasks: (val: Task[]) => void, id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const updateTaskText = (tasks: Task[], setTasks: (val: Task[]) => void, id: number, text: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
    };

    const toggleHabit = (id: string) => {
        setHabits(habits.map(h => {
            if (h.id === id) {
                const newCompleted = !h.completedToday;
                return {
                    ...h,
                    completedToday: newCompleted,
                    streak: newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1) // Simple streak logic for demo
                };
            }
            return h;
        }));
    };

    return (
        <aside className={styles.sidebar}>
            {/* Brain Dump Section */}
            <div className={styles.section}>
                <div className={`${styles.header} ${styles.brainDump}`}>
                    <span className={styles.headerTitle}>1 Brain Dump</span>
                    <span className={styles.headerSubtitle}>(Dump all the tasks)</span>
                </div>
                <ul className={styles.taskList}>
                    {brainDumpTasks.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                            <div
                                className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
                                onClick={() => toggleTask(brainDumpTasks, setBrainDumpTasks, task.id)}
                            />
                            <input
                                type="text"
                                className={styles.label}
                                value={task.text}
                                onChange={(e) => updateTaskText(brainDumpTasks, setBrainDumpTasks, task.id, e.target.value)}
                                placeholder={`Task ${task.id + 1}`}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Top 3 Section */}
            <div className={styles.section}>
                <div className={`${styles.header} ${styles.top3}`}>
                    <span className={styles.headerTitle}>2 Top 3</span>
                    <span className={styles.headerSubtitle}>(Priorities for the day)</span>
                </div>
                <ul className={styles.taskList}>
                    {top3Tasks.map((task) => (
                        <li key={task.id} className={styles.taskItem}>
                            <div
                                className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
                                onClick={() => toggleTask(top3Tasks, setTop3Tasks, task.id)}
                            />
                            <input
                                type="text"
                                className={styles.label}
                                value={task.text}
                                onChange={(e) => updateTaskText(top3Tasks, setTop3Tasks, task.id, e.target.value)}
                                placeholder={`Priority ${task.id + 1}`}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Habits Section */}
            <div className={styles.section}>
                <div className={`${styles.header}`} style={{ borderLeftColor: '#4CAF50', backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                    <span className={styles.headerTitle}>Habits</span>
                    <span className={styles.headerSubtitle}>(Build consistency)</span>
                </div>
                <ul className={styles.taskList}>
                    {habits.map((habit) => (
                        <li key={habit.id} className={styles.taskItem}>
                            <div
                                className={`${styles.checkbox} ${habit.completedToday ? styles.checked : ''}`}
                                style={{ borderRadius: '50%' }} // Circular for habits
                                onClick={() => toggleHabit(habit.id)}
                            />
                            <span className={styles.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {habit.text}
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🔥 {habit.streak}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
