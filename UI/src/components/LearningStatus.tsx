import React from 'react';
import { Book, Clock, AlertCircle } from 'lucide-react';
import type { LearningStatus as LearningStatusType } from '../types';

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
        <div className="flex items-start space-x-3">
          <Book className="h-6 w-6 text-indigo-400" />
          <div>
            <p className="text-sm font-medium text-gray-300">Current Chapter</p>
            <p className="mt-1 text-sm text-white">{mockStatus.currentChapter}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="h-6 w-6 text-yellow-400" />
          <div>
            <p className="text-sm font-medium text-gray-300">Pending Assignments</p>
            <p className="mt-1 text-sm text-white">{mockStatus.pendingAssignments} assignments due</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-red-400" />
          <div>
            <p className="text-sm font-medium text-gray-300">Upcoming Tests</p>
            <div className="mt-1 space-y-1">
              {mockStatus.upcomingTests.map((test) => (
                <p key={test.id} className="text-sm text-white">
                  {test.subject} - {test.topic} ({new Date(test.date).toLocaleDateString()})
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningStatus;