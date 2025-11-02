import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, MessageSquare, CheckSquare, Settings, Zap, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function IntegrationsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // TODO: Fetch real integrations from Supabase
  const tempWorkspaceId = 'temp-workspace-id';
  const integrations = {
    zoom: false,
    slack: false,
    linear: false,
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
                <Link href="/dashboard/actions" className="text-sm text-gray-600 hover:text-gray-900">
                  Actions
                </Link>
                <Link href="/dashboard/integrations" className="text-sm font-medium text-gray-900">
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Integrations</h1>
          <p className="text-gray-600">
            Connect your tools to automate meeting summaries and action items.
          </p>
        </div>

        {/* Core Integrations */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Core Integrations</h2>
            <p className="text-sm text-gray-600 mb-6">
              Required to get started with MeetingActions
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Zoom */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>Zoom</CardTitle>
                        <CardDescription>Meeting transcripts</CardDescription>
                      </div>
                    </div>
                    {integrations.zoom && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Automatically capture transcripts from your Zoom meetings and extract action items.
                  </p>
                  {integrations.zoom ? (
                    <Button variant="outline" className="w-full">
                      Manage Connection
                    </Button>
                  ) : (
                    <Link 
                      href={`/api/integrations/zoom?workspace_id=${tempWorkspaceId}`}
                      className="block"
                    >
                      <Button className="w-full">
                        Connect Zoom
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Slack */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle>Slack</CardTitle>
                        <CardDescription>Post summaries</CardDescription>
                      </div>
                    </div>
                    {integrations.slack && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Automatically post meeting summaries and action items to your Slack channels.
                  </p>
                  {integrations.slack ? (
                    <Button variant="outline" className="w-full">
                      Manage Connection
                    </Button>
                  ) : (
                    <Link 
                      href={`/api/integrations/slack?workspace_id=${tempWorkspaceId}`}
                      className="block"
                    >
                      <Button className="w-full">
                        Connect Slack
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Task Management */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Task Management</h2>
            <p className="text-sm text-gray-600 mb-6">
              Create tasks automatically in your project management tool
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Linear */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-gray-900 rounded-lg flex items-center justify-center">
                      <CheckSquare className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-base">Linear</CardTitle>
                  </div>
                  {integrations.linear && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                      Connected
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Create issues in Linear from meeting actions.
                  </p>
                  {integrations.linear ? (
                    <Button variant="outline" size="sm" className="w-full">
                      Manage
                    </Button>
                  ) : (
                    <Link 
                      href={`/api/integrations/linear?workspace_id=${tempWorkspaceId}`}
                      className="block"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        Connect
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              {/* Asana */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="h-5 w-5 text-orange-600" />
                    </div>
                    <CardTitle className="text-base">Asana</CardTitle>
                  </div>
                  <Badge variant="secondary" className="w-fit">Coming Soon</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Create tasks in Asana projects.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Connect
                  </Button>
                </CardContent>
              </Card>

              {/* Jira */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-base">Jira</CardTitle>
                  </div>
                  <Badge variant="secondary" className="w-fit">Coming Soon</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Create tickets in Jira boards.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" disabled>
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        {!integrations.zoom && (
          <Card className="mt-8 border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">🚀 Get Started in 3 Steps</h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li>1. <strong>Connect Zoom</strong> - We'll receive transcripts after meetings</li>
                <li>2. <strong>Connect Slack</strong> - Summaries will post to your channels</li>
                <li>3. <strong>Connect Linear</strong> - Tasks will auto-create (optional)</li>
              </ol>
              <p className="text-sm text-gray-600 mt-4">
                First summary arrives within 2 minutes of your next meeting. ⚡
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

