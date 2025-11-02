import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Zap, CheckSquare, Filter, 
  Download, Calendar, User
} from 'lucide-react';
import Link from 'next/link';

export default async function ActionsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // TODO: Fetch real actions from Supabase
  const actions = [
    {
      id: '1',
      title: 'Update pricing page with new tiers',
      description: 'Reflect the changes we discussed: Free, Pro, Team tiers',
      owner: 'Sarah Chen',
      dueDate: '2025-11-05',
      priority: 'high' as const,
      status: 'open' as const,
      meeting: 'Product Sprint Planning',
      type: 'task' as const,
    },
    {
      id: '2',
      title: 'Schedule follow-up demo with Acme Corp',
      description: 'They want to see the Linear integration in action',
      owner: 'John Smith',
      dueDate: '2025-11-03',
      priority: 'urgent' as const,
      status: 'in_progress' as const,
      meeting: 'Customer Discovery Call',
      type: 'followup' as const,
    },
    {
      id: '3',
      title: 'Research competitive pricing models',
      description: 'Look at Fireflies, Otter, Fathom pricing',
      owner: 'Emily Johnson',
      dueDate: '2025-11-08',
      priority: 'medium' as const,
      status: 'open' as const,
      meeting: 'Product Sprint Planning',
      type: 'task' as const,
    },
    {
      id: '4',
      title: 'Decision: Move to weekly sprint cycles',
      description: 'Agreed to shift from 2-week to 1-week sprints starting next month',
      owner: 'Team',
      dueDate: null,
      priority: 'medium' as const,
      status: 'completed' as const,
      meeting: 'Weekly Team Sync',
      type: 'decision' as const,
    },
  ];

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

  const typeIcons = {
    task: '📋',
    decision: '✅',
    question: '❓',
    followup: '🔄',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl">MeetingActions</span>
              </Link>
              <div className="flex gap-4">
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/dashboard/meetings" className="text-sm text-gray-600 hover:text-gray-900">
                  Meetings
                </Link>
                <Link href="/dashboard/actions" className="text-sm font-medium text-gray-900">
                  Actions
                </Link>
                <Link href="/dashboard/integrations" className="text-sm text-gray-600 hover:text-gray-900">
                  Integrations
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Free Plan</Badge>
              <Link href="/dashboard/settings">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Action Items</h1>
            <p className="text-gray-600">
              All action items extracted from your meetings.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Actions List */}
        {actions.length > 0 ? (
          <div className="space-y-3">
            {actions.map((action) => (
              <Card key={action.id} className="hover:shadow-md transition">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <input 
                      type="checkbox" 
                      className="mt-1 h-5 w-5 rounded border-gray-300" 
                      checked={action.status === 'completed'}
                      readOnly
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{typeIcons[action.type]}</span>
                            <h3 className={`font-semibold text-lg ${action.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
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
            ))}
          </div>
        ) : (
          <Card className="py-16">
            <CardContent className="text-center">
              <CheckSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No action items yet</h3>
              <p className="text-gray-600 mb-6">
                Process your first meeting to see AI-extracted action items here.
              </p>
              <Link href="/dashboard/integrations">
                <Button>
                  Connect Zoom
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

