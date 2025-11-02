import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Zap, Video, Download
} from 'lucide-react';
import Link from 'next/link';
import { MeetingsList } from '@/components/meetings-list';

export default async function MeetingsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // TODO: Fetch real meetings from Supabase
  const meetings = [
    {
      id: '1',
      title: 'Product Sprint Planning',
      date: '2025-11-01T14:00:00Z',
      duration: 45,
      participants: ['Sarah Chen', 'John Smith', 'Emily Johnson'],
      actions: 5,
      status: 'completed' as const,
      hasRecording: true,
      hasTranscript: true,
    },
    {
      id: '2',
      title: 'Customer Discovery Call - Acme Corp',
      date: '2025-10-31T10:00:00Z',
      duration: 30,
      participants: ['Sarah Chen', 'Mike Wilson'],
      actions: 3,
      status: 'completed' as const,
      hasRecording: true,
      hasTranscript: true,
    },
    {
      id: '3',
      title: 'Weekly Team Sync',
      date: '2025-10-30T09:00:00Z',
      duration: 25,
      participants: ['All Team'],
      actions: 8,
      status: 'completed' as const,
      hasRecording: false,
      hasTranscript: true,
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
                <Link href="/dashboard/meetings" className="text-sm font-medium text-gray-900">
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
        {meetings.length > 0 ? (
          <MeetingsList meetings={meetings} />
        ) : (
          <Card className="py-16">
            <CardContent className="text-center">
              <Video className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No meetings yet</h3>
              <p className="text-gray-600 mb-6">
                Connect Zoom to start processing your meetings automatically.
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

