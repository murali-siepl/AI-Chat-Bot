import React from 'react';
import { Book, Clock, AlertCircle } from 'lucide-react';
import type { LearningStatus as LearningStatusType } from '../../types';
import StatusCard from './components/StatusCard';

const mockStatus: LearningStatusType = {
  currentChapter: "Advanced Calculus - Derivatives",
  pendingAssignments: 2,
  upcomingTests: [
    {
      id: "1",
      subject: "Mathematics",
      date: "2024-03-25",
      topic: "Integration"
    },
    {
      id: "2",
      subject: "Physics",
      date: "2024-03-28",
      topic: "Quantum Mechanics"
    }
  ]
};

const LearningStatus: React.FC = () => {
  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-lg border border-gray-700">
      <h2 className="text-lg font-semibold text-white">Current Learning Status</h2>
      
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <StatusCard icon={Book} title="Current Chapter">
          <p className="text-sm text-white">{mockStatus.currentChapter}</p>
        </StatusCard>

        <StatusCard icon={Clock} title="Pending Assignments" iconColor="text-yellow-400">
          <p className="text-sm text-white">{mockStatus.pendingAssignments} assignments due</p>
        </StatusCard>

        <StatusCard icon={AlertCircle} title="Upcoming Tests" iconColor="text-red-400">
          <div className="space-y-1">
            {mockStatus.upcomingTests.map((test) => (
              <p key={test.id} className="text-sm text-white">
                {test.subject} - {test.topic} ({new Date(test.date).toLocaleDateString()})
              </p>
            ))}
          </div>
        </StatusCard>
      </div>
    </div>
  );
};

export default LearningStatus;