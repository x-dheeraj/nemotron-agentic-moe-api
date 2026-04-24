'use client';

import React, { useState } from 'react';
import styles from './ViewSelector.module.css';
import FocusTimer from '@/components/FocusTimer/FocusTimer';
import AnalyticsDashboard from '@/components/Analytics/AnalyticsDashboard';

export type ViewType = 'DAILY FEEDBACK' | '3-DAY FEEDBACK' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'HALF-YEARLY' | 'ANNUAL';

interface ViewSelectorProps {
    currentView: ViewType;
    onViewChange: (view: ViewType) => void;
}

const views: ViewType[] = ['DAILY FEEDBACK', '3-DAY FEEDBACK', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'HALF-YEARLY', 'ANNUAL'];

export default function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
    const [showAnalytics, setShowAnalytics] = useState(false);

    const handleExport = () => {
        const data = {
            brainDump: localStorage.getItem('brainDumpTasks'),
            top3: localStorage.getItem('top3Tasks'),
            habits: localStorage.getItem('habits'),
            daily: localStorage.getItem('dailySchedule'),
            threeDay: localStorage.getItem('threeDaySchedule'),
            weekly: localStorage.getItem('weeklySchedule'),
            monthly: localStorage.getItem('monthlySchedule'),
            quarterly: localStorage.getItem('quarterlySchedule'),
            halfYearly: localStorage.getItem('halfYearly'),
            annual: localStorage.getItem('annual'),
            dailyReviews: localStorage.getItem('review_archive'), // Include archives
            threeDayReviews: localStorage.getItem('review_archive') // Shared archive key? actually useReviewCycle uses 'review_archive' for both types currently
        };

        const today = new Date().toISOString().split('T')[0];
        let mdContent = `# Progress Tracker Backup - ${today}\n\n`;

        // Helper
        const safeParse = (json: string | null) => {
            try { return json ? JSON.parse(json) : null; }
            catch { return null; }
        };

        // Tasks
        const brainDump = safeParse(data.brainDump) || [];
        mdContent += `## Brain Dump\n`;
        brainDump.forEach((t: any) => mdContent += `- [${t.completed ? 'x' : ' '}] ${t.text || 'Untitled'}\n`);

        const top3 = safeParse(data.top3) || [];
        mdContent += `\n## Top 3 Priorities\n`;
        top3.forEach((t: any) => mdContent += `- [${t.completed ? 'x' : ' '}] ${t.text || 'Untitled'}\n`);

        // Habits
        const habits = safeParse(data.habits) || [];
        mdContent += `\n## Habits\n`;
        habits.forEach((h: any) => mdContent += `- ${h.text}: Streak ${h.streak}\n`);

        // Archives
        const archives = safeParse(data.dailyReviews) || [];
        if (archives.length > 0) {
            mdContent += `\n## Review Archive\n`;
            archives.forEach((entry: any) => {
                mdContent += `\n### ${entry.type} Review - ${entry.date}\n`;
                if (entry.data) {
                    Object.entries(entry.data).forEach(([k, v]) => mdContent += `- **${k}**: ${JSON.stringify(v)}\n`);
                }
            });
        }

        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tracker_backup_${today}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Time Box: {currentView}</h1>

            <nav className={styles.nav}>
                {views.map((view) => (
                    <button
                        key={view}
                        className={`${styles.navItem} ${currentView === view ? styles.active : ''}`}
                        onClick={() => onViewChange(view)}
                    >
                        {view}
                    </button>
                ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                <button
                    className={styles.navItem}
                    onClick={() => setShowAnalytics(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <span>📊</span> Analytics
                </button>
                <button
                    className={styles.navItem}
                    onClick={handleExport}
                    title="Export Data"
                    style={{ fontSize: '1.2rem', padding: '0.25rem 0.5rem' }}
                >
                    📥
                </button>
                <FocusTimer />
            </div>

            {showAnalytics && <AnalyticsDashboard onClose={() => setShowAnalytics(false)} />}
        </div>
    );
}
