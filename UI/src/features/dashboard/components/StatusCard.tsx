import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  iconColor?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ icon: Icon, title, children, iconColor = 'text-indigo-400' }) => {
  return (
    <div className="flex items-start space-x-3">
      <Icon className={`h-6 w-6 ${iconColor}`} />
      <div>
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
};

export default StatusCard;