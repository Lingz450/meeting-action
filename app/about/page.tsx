import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Target, Users, Clock, CheckCircle, Video } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">MeetingActions</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/docs">
                <Button variant="ghost">Docs</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Turn Meeting Talk Into Shipped Tasks
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            AI-powered meeting summaries that actually create tasks in your workflow
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started Free
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Problem Statement */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold mb-4">The Problem We Solve</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Teams waste <strong>15 hours per week</strong> in meetings where action items get lost in notes, 
            Slack threads, or forgotten emails. We fix that.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Connect Your Meetings</h3>
                <p className="text-gray-600">
                  Connect Zoom or Microsoft Teams. We automatically capture transcripts after every meeting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. AI Extracts Actions</h3>
                <p className="text-gray-600">
                  GPT-4 identifies tasks, decisions, and owners. Assigns priorities and due dates automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Push to Your Tools</h3>
                <p className="text-gray-600">
                  Posts to Slack and creates tasks in Linear, Asana, or Jira. All within 2 minutes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle,
                title: 'AI Action Extraction',
                description: 'GPT-4 automatically identifies tasks, decisions, and owners from transcripts',
                color: 'text-green-600',
                bg: 'bg-green-50',
              },
              {
                icon: Clock,
                title: '2-Minute Processing',
                description: 'Summaries and tasks created within 2 minutes of meeting end',
                color: 'text-blue-600',
                bg: 'bg-blue-50',
              },
              {
                icon: Target,
                title: 'Multi-Platform Integration',
                description: 'Works with Zoom, Teams, Slack, Linear, Asana, and Jira',
                color: 'text-purple-600',
                bg: 'bg-purple-50',
              },
              {
                icon: Users,
                title: 'Team Analytics',
                description: 'Track action completion rates, meeting efficiency, and team performance',
                color: 'text-orange-600',
                bg: 'bg-orange-50',
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Built With Modern Tech</h2>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Frontend & Backend</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ Next.js 14 (App Router)</li>
                    <li>✅ TypeScript</li>
                    <li>✅ Tailwind CSS + Shadcn UI</li>
                    <li>✅ Vercel Hosting</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Services & Integrations</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ OpenAI GPT-4 Turbo</li>
                    <li>✅ Clerk Authentication</li>
                    <li>✅ Supabase (PostgreSQL)</li>
                    <li>✅ Stripe + Paystack Payments</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-4">$0</div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>✓ 10 meetings/month</li>
                  <li>✓ Basic AI extraction</li>
                  <li>✓ Slack integration</li>
                  <li>✓ Email summaries</li>
                </ul>
                <Link href="/sign-up">
                  <Button variant="outline" className="w-full">Start Free</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-600 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">$19<span className="text-lg text-gray-600">/mo</span></div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>✓ Unlimited meetings</li>
                  <li>✓ Advanced AI extraction</li>
                  <li>✓ All integrations</li>
                  <li>✓ Priority support</li>
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Team</h3>
                <div className="text-3xl font-bold mb-4">$99<span className="text-lg text-gray-600">/mo</span></div>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>✓ Everything in Pro</li>
                  <li>✓ Up to 20 users</li>
                  <li>✓ SSO (Google, Microsoft)</li>
                  <li>✓ Admin analytics</li>
                </ul>
                <Link href="/sign-up">
                  <Button variant="outline" className="w-full">Start Free Trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          <p className="text-center text-sm text-gray-600 mt-6">
            💳 Accept payments globally with Stripe + Paystack (African markets)
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Never Miss an Action Item Again?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join teams using MeetingActions to ship faster and stay aligned
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    View Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="font-bold">MeetingActions</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/docs" className="hover:text-gray-900">Documentation</Link>
              <Link href="/about" className="hover:text-gray-900">About</Link>
              <a href="https://github.com/Lingz450/meeting-action" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

