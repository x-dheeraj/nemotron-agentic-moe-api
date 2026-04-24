'use client';

import React from 'react';
import { useLocalStorage } from '@/lib/useLocalStorage';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
    onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
    const [startHour, setStartHour] = useLocalStorage<number>('dayStartHour', 4); // Default 4 AM
    const [endHour, setEndHour] = useLocalStorage<number>('dayEndHour', 22);   // Default 10 PM

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
            annual: localStorage.getItem('annual')
        };

        const today = new Date().toISOString().split('T')[0];
        let mdContent = `# Progress Tracker Backup - ${today}\n\n`;

        // Helper to parse safely
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
        habits.forEach((h: any) => mdContent += `- ${h.text}: Streak ${h.streak}, Today: ${h.completedToday ? 'Yes' : 'No'}\n`);

        // Schedules (Simplified Dump)
        mdContent += `\n## Schedules (Raw Data)\n`;
        mdContent += `### Daily\n\`\`\`json\n${JSON.stringify(safeParse(data.daily), null, 2)}\n\`\`\`\n`;
        mdContent += `### Weekly\n\`\`\`json\n${JSON.stringify(safeParse(data.weekly), null, 2)}\n\`\`\`\n`;
        mdContent += `### Monthly\n\`\`\`json\n${JSON.stringify(safeParse(data.monthly), null, 2)}\n\`\`\`\n`;
        mdContent += `### Annual\n\`\`\`json\n${JSON.stringify(safeParse(data.annual), null, 2)}\n\`\`\`\n`;

        // Download
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tracker_backup_${today}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Settings</h2>
                    <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.content}>
                    <div className={styles.settingRow}>
                        <label>Day Start Time (24h)</label>
                        <input
                            type="number"
                            min="0"
                            max="23"
                            value={startHour}
                            onChange={(e) => setStartHour(Number(e.target.value))}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.settingRow}>
                        <label>Day End Time (24h)</label>
                        <input
                            type="number"
                            min="0"
                            max="24"
                            value={endHour}
                            onChange={(e) => setEndHour(Number(e.target.value))}
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.settingRow}>
                        <label>Data Management</label>
                        <button onClick={handleExport} className={styles.exportBtn}>
                            📥 Export Data to Markdown
                        </button>
                    </div>
                    <p className={styles.hint}>Adjusting these will update Daily and 3-Day views immediately.</p>
                </div>
            </div>
        </div>
    );
}
