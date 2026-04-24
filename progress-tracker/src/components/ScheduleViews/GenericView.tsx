'use client';

import React from 'react';
import styles from './ScheduleViews.module.css';

export default function GenericView({ title }: { title: string }) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                3 {title} Schedule
            </div>
            <div className={styles.tableContainer} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <p>Values for {title} (Coming Soon)</p>
            </div>
        </div>
    );
}
