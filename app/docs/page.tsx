import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Zap, FileText, Globe, CreditCard, Settings } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  const docs = [
    {
      title: 'Quick Start',
      description: 'Get started in 10 minutes. Essential setup for testing the app.',
      icon: Zap,
      file: 'QUICK_START.md',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Full Setup Guide',
      description: 'Complete setup instructions including database, AI, and integrations.',
      icon: BookOpen,
      file: 'README.md',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Step-by-Step Setup',
      description: 'Detailed walkthrough of every integration (Zoom, Slack, Linear, Teams).',
      icon: Settings,
      file: 'SETUP.md',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Paystack Setup',
      description: 'Accept payments from African markets (Nigeria, Ghana, South Africa).',
      icon: CreditCard,
      file: 'PAYSTACK_SETUP.md',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      title: 'Deployment Guide',
      description: 'Production deployment checklist and Vercel setup.',
      icon: Globe,
      file: 'DEPLOYMENT.md',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Project Summary',
      description: 'Overview of architecture, features, and technical decisions.',
      icon: FileText,
      file: 'PROJECT_SUMMARY.md',
      color: 'text-gray-600',
      bg: 'bg-gray-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <nav className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">MeetingActions</span>
            </Link>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📚 Documentation
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to set up, customize, and deploy your MeetingActions SaaS
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="mb-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-600" />
            First Time Here?
          </h2>
          <p className="text-gray-700 mb-4">
            Start with the <strong>Quick Start</strong> guide to get the app running in 10 minutes.
            Then explore the other guides as needed.
          </p>
          <div className="flex gap-3">
            <a 
              href="https://github.com/Lingz450/meeting-action/blob/main/QUICK_START.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-blue-600 hover:bg-blue-700">
                Read Quick Start
              </Button>
            </a>
            <a 
              href="https://github.com/Lingz450/meeting-action"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>

        {/* Documentation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <Card 
                key={idx}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${doc.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-6 w-6 ${doc.color}`} />
                  </div>
                  <CardTitle className="text-xl">{doc.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {doc.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`https://github.com/Lingz450/meeting-action/blob/main/${doc.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full group-hover:bg-gray-50">
                      Read {doc.file}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>What this app is built with</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Frontend:</strong> Next.js 14, TypeScript, Tailwind CSS, Shadcn UI</li>
                  <li><strong>Auth:</strong> Clerk (Google, Microsoft, Slack OAuth)</li>
                  <li><strong>Database:</strong> PostgreSQL (Supabase)</li>
                  <li><strong>AI:</strong> OpenAI GPT-4 Turbo</li>
                  <li><strong>Payments:</strong> Stripe + Paystack (Africa)</li>
                  <li><strong>Hosting:</strong> Vercel</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What this app can do</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✅ AI-powered action item extraction</li>
                  <li>✅ Zoom & Teams meeting integration</li>
                  <li>✅ Auto-post to Slack channels</li>
                  <li>✅ Create tasks in Linear/Asana/Jira</li>
                  <li>✅ Beautiful analytics dashboard</li>
                  <li>✅ Multi-currency payments (Stripe + Paystack)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Environment Variables Reference */}
        <div className="mt-12">
          <Card className="bg-gray-900 text-gray-100">
            <CardHeader>
              <CardTitle className="text-white">Environment Variables Quick Reference</CardTitle>
              <CardDescription className="text-gray-400">
                Essential keys for .env.local
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
{`# Clerk Auth (Required - Already Set)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database (Optional)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# AI (Optional)
OPENAI_API_KEY=sk-proj-xxx

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PRICE_ID_PRO=price_xxx
STRIPE_PRICE_ID_TEAM=price_xxx

# Paystack (Optional - Africa)
PAYSTACK_SECRET_KEY=sk_test_xxx`}
              </pre>
              <p className="text-sm text-gray-400 mt-4">
                💡 Only Clerk is required to run the app. Add others as needed.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                All documentation is available in your project folder and on GitHub
              </p>
              <div className="flex gap-3 justify-center">
                <Link href="/dashboard">
                  <Button>Back to Dashboard</Button>
                </Link>
                <a 
                  href="https://github.com/Lingz450/meeting-action/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Report an Issue</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

