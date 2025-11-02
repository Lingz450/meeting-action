import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, Zap, User, Bell, Shield, 
  Trash2, Save, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default async function SettingsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Profile Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  defaultValue={user.firstName || ''} 
                  placeholder="First name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  defaultValue={user.lastName || ''} 
                  placeholder="Last name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                defaultValue={user.emailAddresses[0]?.emailAddress || ''} 
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed here. Use Clerk User Management.
              </p>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Workspace Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>
              Manage your workspace settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input 
                id="workspaceName" 
                defaultValue="My Workspace" 
                placeholder="Enter workspace name"
              />
            </div>
            <div>
              <Label htmlFor="workspaceSlug">Workspace URL</Label>
              <div className="flex gap-2">
                <Input 
                  id="workspaceSlug" 
                  defaultValue="my-workspace" 
                  placeholder="workspace-slug"
                />
                <Badge variant="secondary" className="self-center">
                  .meetingactions.com
                </Badge>
              </div>
            </div>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Workspace
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Choose what notifications you receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Meeting Summaries</p>
                <p className="text-sm text-gray-600">Get notified when a meeting is processed</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Action Item Assignments</p>
                <p className="text-sm text-gray-600">Get notified when you're assigned an action</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Due Date Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about upcoming due dates</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Summary</p>
                <p className="text-sm text-gray-600">Get a weekly summary of your activity</p>
              </div>
              <input type="checkbox" className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-gray-600">Change your password</p>
              </div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sessions</p>
                <p className="text-sm text-gray-600">Manage your active sessions</p>
              </div>
              <Button variant="outline" size="sm">
                View Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Billing & Subscription</CardTitle>
            <CardDescription>
              Manage your subscription and payment method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Current Plan</p>
                <p className="text-sm text-gray-600">Free - 10 meetings/month</p>
              </div>
              <Badge>Free</Badge>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/billing" className="flex-1">
                <Button variant="outline" className="w-full">
                  View Billing
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button className="flex-1">
                Upgrade Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Workspace</p>
                <p className="text-sm text-gray-600">Permanently delete this workspace and all data</p>
              </div>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

