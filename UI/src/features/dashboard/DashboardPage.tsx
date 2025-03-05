import React from 'react';
import LearningStatus from './LearningStatus';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Welcome back!</h1>
      <LearningStatus />
      {/* Add more dashboard components here */}
    </div>
  );
};

export default DashboardPage;