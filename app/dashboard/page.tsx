import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Video, CheckSquare, Clock, TrendingUp, 
  Plus, Settings, Zap, MessageSquare 
} from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // TODO: Fetch real data from Supabase
  const stats = {
    meetingsThisMonth: 8,
    actionsCreated: 24,
    completionRate: 87,
    hoursGained: 3.5,
  };

  const recentMeetings = [
    {
      id: '1',
      title: 'Product Sprint Planning',
      date: '2025-11-01T14:00:00Z',
      actions: 5,
      status: 'completed' as const,
    },
    {
      id: '2',
      title: 'Customer Discovery Call',
      date: '2025-10-31T10:00:00Z',
      actions: 3,
      status: 'completed' as const,
    },
  ];

  const recentActions = [
    {
      id: '1',
      title: 'Update pricing page with new tiers',
      owner: 'Sarah Chen',
      dueDate: '2025-11-05',
      status: 'open' as const,
      priority: 'high' as const,
    },
    {
      id: '2',
      title: 'Schedule follow-up demo with Acme Corp',
      owner: 'John Smith',
      dueDate: '2025-11-03',
      status: 'in_progress' as const,
      priority: 'urgent' as const,
    },
  ];

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
                <Link href="/dashboard" className="text-sm font-medium text-gray-900">
                  Dashboard
                </Link>
                <Link href="/dashboard/meetings" className="text-sm text-gray-600 hover:text-gray-900">
                  Meetings
                </Link>
                <Link href="/dashboard/actions" className="text-sm text-gray-600 hover:text-gray-900">
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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.firstName || 'there'}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your meetings and actions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Meetings This Month</p>
                  <p className="text-3xl font-bold">{stats.meetingsThisMonth}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Actions Created</p>
                  <p className="text-3xl font-bold">{stats.actionsCreated}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold">{stats.completionRate}%</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hours Gained</p>
                  <p className="text-3xl font-bold">{stats.hoursGained}h</p>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Meetings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Meetings</CardTitle>
              <Link href="/dashboard/meetings">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMeetings.map((meeting) => (
                  <div 
                    key={meeting.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{meeting.title}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(meeting.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">
                        {meeting.actions} actions
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Completed
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {recentMeetings.length === 0 && (
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No meetings yet</p>
                    <Link href="/dashboard/integrations">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Connect Zoom or Meet
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Action Items</CardTitle>
              <Link href="/dashboard/actions">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div 
                    key={action.id} 
                    className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 transition"
                  >
                    <input 
                      type="checkbox" 
                      className="mt-1 h-5 w-5 rounded border-gray-300" 
                      checked={action.status === 'in_progress'}
                      readOnly
                    />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{action.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{action.owner}</span>
                        <span>•</span>
                        <span>Due {new Date(action.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={action.priority === 'urgent' ? 'destructive' : 'secondary'}
                      className={action.priority === 'high' ? 'bg-orange-100 text-orange-700' : ''}
                    >
                      {action.priority}
                    </Badge>
                  </div>
                ))}
                
                {recentActions.length === 0 && (
                  <div className="text-center py-12">
                    <CheckSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No action items yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integrations CTA */}
        {recentMeetings.length === 0 && (
          <Card className="mt-8 border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Connect your tools to get started</h3>
                  <p className="text-sm text-gray-700">
                    Link Zoom for meeting transcripts, Slack for summaries, and Linear for tasks.
                  </p>
                </div>
                <Link href="/dashboard/integrations">
                  <Button>
                    Setup Integrations
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

