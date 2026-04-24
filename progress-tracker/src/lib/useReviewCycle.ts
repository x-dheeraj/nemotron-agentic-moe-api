'use client';

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface ArchiveEntry {
    date: string;
    type: 'DAILY' | '3-DAY';
    data: any;
}

export function useReviewCycle(type: 'DAILY' | '3-DAY') {
    const [lastReviewDate, setLastReviewDate] = useLocalStorage<string>(`last_review_date_${type}`, new Date().toISOString().split('T')[0]);
    const [archive, setArchive] = useLocalStorage<ArchiveEntry[]>('review_archive', []);

    // Data keys based on type
    const keys = type === 'DAILY'
        ? ['daily_wins', 'daily_losses', 'daily_plan']
        : ['review_wins', 'review_challenges', 'review_focus'];

    useEffect(() => {
        const checkCycle = () => {
            const todayDate = new Date().toISOString().split('T')[0];

            let shouldReset = false;

            if (type === 'DAILY') {
                // Simple string comparison for daily reset
                if (lastReviewDate !== todayDate) {
                    shouldReset = true;
                }
            } else if (type === '3-DAY') {
                const today = new Date(todayDate);
                const last = new Date(lastReviewDate);
                const diffTime = Math.abs(today.getTime() - last.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                if (diffDays >= 3) {
                    shouldReset = true;
                }
            }

            if (shouldReset) {
                // 1. Gather old data
                const oldData: any = {};
                keys.forEach(key => {
                    const item = window.localStorage.getItem(key);
                    if (item) oldData[key] = JSON.parse(item);
                });

                // 2. Archive if not empty
                const hasData = Object.values(oldData).some(val => val !== '' && val !== '""');
                if (hasData) {
                    const newArchive = [...archive, { date: lastReviewDate, type, data: oldData }];
                    window.localStorage.setItem('review_archive', JSON.stringify(newArchive));
                }

                // 3. Reset keys
                keys.forEach(key => {
                    window.localStorage.setItem(key, JSON.stringify(''));
                    window.dispatchEvent(new CustomEvent('local-storage-update', { detail: { key, newValue: '' } }));
                });

                // 4. Update last review date to today
                setLastReviewDate(todayDate);
            }
        };

        checkCycle();
        // Check every minute just in case app is left open across midnight
        const interval = setInterval(checkCycle, 60000);
        return () => clearInterval(interval);
    }, [type, lastReviewDate, JSON.stringify(keys), JSON.stringify(archive), setLastReviewDate]);
    // Actually depend on lastReviewDate is fine, if it updates we re-check but diff will be 0.
}
