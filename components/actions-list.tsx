'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';
import { ActionItem } from './action-item';

interface Action {
  id: string;
  title: string;
  description?: string;
  owner: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  meeting: string;
  type: 'task' | 'decision' | 'question' | 'followup';
}

interface ActionsListProps {
  initialActions: Action[];
}

export function ActionsList({ initialActions }: ActionsListProps) {
  const [actions, setActions] = useState(initialActions);
  const [filter, setFilter] = useState<'all' | 'open' | 'completed'>('all');

  const handleStatusChange = (id: string, newStatus: string) => {
    setActions(actions.map(action => 
      action.id === id 
        ? { ...action, status: newStatus as Action['status'] } 
        : action
    ));
  };

  const handleExport = () => {
    // Create CSV content
    const csv = [
      ['Title', 'Description', 'Owner', 'Due Date', 'Priority', 'Status', 'Type', 'Meeting'].join(','),
      ...actions.map(a => [
        `"${a.title}"`,
        `"${a.description || ''}"`,
        a.owner,
        a.dueDate || '',
        a.priority,
        a.status,
        a.type,
        `"${a.meeting}"`
      ].join(','))
    ].join('\n');

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `actions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterToggle = () => {
    const filters: Array<'all' | 'open' | 'completed'> = ['all', 'open', 'completed'];
    const currentIndex = filters.indexOf(filter);
    const nextFilter = filters[(currentIndex + 1) % filters.length];
    setFilter(nextFilter);
  };

  const filteredActions = actions.filter(action => {
    if (filter === 'all') return true;
    if (filter === 'open') return action.status !== 'completed';
    if (filter === 'completed') return action.status === 'completed';
    return true;
  });

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Action Items</h1>
          <p className="text-gray-600">
            All action items extracted from your meetings.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleFilterToggle}>
            <Filter className="mr-2 h-4 w-4" />
            Filter: {filter}
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredActions.map((action) => (
          <ActionItem 
            key={action.id} 
            action={action} 
            onStatusChange={handleStatusChange}
          />
        ))}
        {filteredActions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No actions found for filter: <strong>{filter}</strong>
          </div>
        )}
      </div>
    </>
  );
}

