'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import ViewSelector, { ViewType } from '@/components/ViewSelector/ViewSelector';
import DailyReview from '@/components/DailyReview/DailyReview';
import ThreeDayReview from '@/components/ThreeDayReview/ThreeDayReview';
import WeeklyView from '@/components/ScheduleViews/WeeklyView';
import MonthlyView from '@/components/ScheduleViews/MonthlyView';
import QuarterlyView from '@/components/ScheduleViews/QuarterlyView';
import HalfYearlyView from '@/components/ScheduleViews/HalfYearlyView';
import AnnualView from '@/components/ScheduleViews/AnnualView';
export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('3-DAY FEEDBACK');

  const renderView = () => {
    switch (currentView) {
      case 'DAILY FEEDBACK': return <DailyReview />;
      case '3-DAY FEEDBACK': return <ThreeDayReview />;
      case 'WEEKLY': return <WeeklyView />;
      case 'MONTHLY': return <MonthlyView />;
      case 'QUARTERLY': return <QuarterlyView />;
      case 'HALF-YEARLY': return <HalfYearlyView />;
      case 'ANNUAL': return <AnnualView />;
      default: return <ThreeDayReview />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
        {renderView()}
      </main>
    </div>
  );
}
