import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Zap, TrendingUp, Users, Video, 
  CheckSquare, Clock, Target, ArrowUp, ArrowDown
} from 'lucide-react';
import Link from 'next/link';

export default async function AnalyticsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // TODO: Fetch real analytics from Supabase
  const analytics = {
    totalMeetings: 24,
    totalActions: 89,
    completionRate: 87,
    avgActionsPerMeeting: 3.7,
    hoursGained: 12.5,
    activeUsers: 8,
    trends: {
      meetings: +15, // % change from last month
      actions: +23,
      completion: -5,
    },
  };

  const topUsers = [
    { name: 'Sarah Chen', meetings: 8, actions: 24, completion: 95 },
    { name: 'John Smith', meetings: 6, actions: 18, completion: 89 },
    { name: 'Emily Johnson', meetings: 5, actions: 21, completion: 81 },
  ];

  const recentActivity = [
    { 
      type: 'meeting', 
      title: 'Product Sprint Planning', 
      user: 'Sarah Chen',
      actions: 5,
      time: '2 hours ago' 
    },
    { 
      type: 'action', 
      title: 'Updated pricing page completed', 
      user: 'John Smith',
      time: '3 hours ago' 
    },
    { 
      type: 'meeting', 
      title: 'Customer Discovery Call', 
      user: 'Emily Johnson',
      actions: 3,
      time: '1 day ago' 
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
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/dashboard/analytics" className="text-sm font-medium text-gray-900">
                  Analytics
                </Link>
                <Link href="/dashboard/integrations" className="text-sm text-gray-600 hover:text-gray-900">
                  Integrations
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Team Plan</Badge>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Team Analytics</h1>
          <p className="text-gray-600">
            Track team performance and meeting effectiveness.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Meetings</p>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{analytics.totalMeetings}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">+{analytics.trends.meetings}%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Actions Created</p>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{analytics.totalActions}</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium">+{analytics.trends.actions}%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Completion Rate</p>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{analytics.completionRate}%</p>
              <div className="flex items-center gap-1 text-sm">
                <ArrowDown className="h-4 w-4 text-red-600" />
                <span className="text-red-600 font-medium">{analytics.trends.completion}%</span>
                <span className="text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Hours Gained</p>
                <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{analytics.hoursGained}h</p>
              <p className="text-sm text-gray-500">
                {analytics.avgActionsPerMeeting} actions/meeting
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
              <CardDescription>Most active team members this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topUsers.map((user, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">
                        {user.meetings} meetings • {user.actions} actions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{user.completion}%</p>
                      <p className="text-xs text-gray-500">completion</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest meetings and completed actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {activity.type === 'meeting' ? (
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Video className="h-5 w-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckSquare className="h-5 w-5 text-green-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{activity.title}</p>
                      <p className="text-sm text-gray-600">
                        {activity.user}
                        {activity.type === 'meeting' && ` • ${activity.actions} actions`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROI Calculator */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              ROI This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Time Saved</p>
                <p className="text-3xl font-bold text-blue-600">{analytics.hoursGained} hours</p>
                <p className="text-sm text-gray-500 mt-1">
                  ~{Math.round(analytics.hoursGained * 60)} minutes per meeting
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Cost Savings</p>
                <p className="text-3xl font-bold text-green-600">
                  ${Math.round(analytics.hoursGained * 50)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Based on $50/hour average
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Action Follow-Through</p>
                <p className="text-3xl font-bold text-purple-600">{analytics.completionRate}%</p>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((analytics.totalActions * analytics.completionRate) / 100)} tasks completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

