'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';

interface ActionItemProps {
  action: {
    id: string;
    title: string;
    description?: string;
    owner: string;
    dueDate: string | null;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in_progress' | 'completed' | 'cancelled';
    meeting: string;
    type: 'task' | 'decision' | 'question' | 'followup';
  };
  onStatusChange?: (id: string, newStatus: string) => void;
}

const statusColors = {
  open: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const typeIcons: Record<string, string> = {
  task: '📋',
  decision: '✅',
  question: '❓',
  followup: '🔄',
};

export function ActionItem({ action, onStatusChange }: ActionItemProps) {
  const [isChecked, setIsChecked] = useState(action.status === 'completed');

  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    const newStatus = newChecked ? 'completed' : 'open';
    onStatusChange?.(action.id, newStatus);
    
    // Show toast notification
    if (typeof window !== 'undefined') {
      alert(newChecked ? '✅ Action marked as completed!' : '↩️ Action reopened');
    }
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <input 
            type="checkbox" 
            className="mt-1 h-5 w-5 rounded border-gray-300 cursor-pointer" 
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{typeIcons[action.type]}</span>
                  <h3 className={`font-semibold text-lg ${isChecked ? 'line-through text-gray-500' : ''}`}>
                    {action.title}
                  </h3>
                </div>
                {action.description && (
                  <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                )}
              </div>
              <Badge className={priorityColors[action.priority]}>
                {action.priority}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {action.owner}
              </span>
              {action.dueDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due {new Date(action.dueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              )}
              <span className="text-gray-400">•</span>
              <span>From: {action.meeting}</span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Badge variant="outline" className={statusColors[action.status]}>
                {action.status.replace('_', ' ')}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {action.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

