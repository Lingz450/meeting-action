import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
  const posts = [
    {
      title: 'Introducing MeetingActions: Turn Talk Into Tasks',
      excerpt: 'We built MeetingActions to solve a problem every team faces: action items get lost after meetings. Here\'s how we\'re fixing it.',
      date: 'Nov 2, 2025',
      category: 'Product',
      readTime: '5 min read',
      slug: 'introducing-meetingactions',
    },
    {
      title: 'How We Use AI to Extract Action Items',
      excerpt: 'A deep dive into our GPT-4 prompt engineering and how we achieve 95% accuracy in action item extraction from meeting transcripts.',
      date: 'Nov 1, 2025',
      category: 'Engineering',
      readTime: '8 min read',
      slug: 'ai-action-extraction',
    },
    {
      title: 'Why We Added Paystack for African Markets',
      excerpt: 'Supporting payments in Nigeria, Ghana, and South Africa with local currencies and payment methods. Here\'s what we learned.',
      date: 'Oct 30, 2025',
      category: 'Product',
      readTime: '4 min read',
      slug: 'paystack-african-markets',
    },
    {
      title: 'Building a Production-Ready SaaS in 2025',
      excerpt: 'Our tech stack decisions: Next.js 14, Clerk, Supabase, and why we chose Vercel for hosting. A complete breakdown.',
      date: 'Oct 28, 2025',
      category: 'Engineering',
      readTime: '10 min read',
      slug: 'saas-tech-stack-2025',
    },
    {
      title: 'Zoom vs Teams: Meeting Integration Challenges',
      excerpt: 'The surprising differences between integrating with Zoom and Microsoft Teams APIs, and what we learned building both.',
      date: 'Oct 25, 2025',
      category: 'Engineering',
      readTime: '6 min read',
      slug: 'zoom-vs-teams-integration',
    },
    {
      title: '5 Ways AI Can Improve Your Meeting Workflow',
      excerpt: 'Beyond action items: how AI can help with meeting summaries, sentiment analysis, and identifying key decisions.',
      date: 'Oct 22, 2025',
      category: 'Tips',
      readTime: '7 min read',
      slug: 'ai-meeting-workflow',
    },
  ];

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
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            📝 Blog
          </h1>
          <p className="text-xl text-blue-100">
            Product updates, engineering insights, and tips for better meetings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden hover:shadow-xl transition-shadow border-2 border-blue-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2"></div>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-600">Featured</Badge>
              <Badge variant="outline">{posts[0].category}</Badge>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {posts[0].date}
              </span>
            </div>
            <CardTitle className="text-3xl mb-2">{posts[0].title}</CardTitle>
            <CardDescription className="text-base">{posts[0].excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{posts[0].readTime}</span>
              <Button>
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Badges */}
        <div className="mb-8 flex gap-3 flex-wrap">
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">All Posts</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Product</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Engineering</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">Tips</Badge>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {posts.slice(1).map((post, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{post.readTime}</span>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Load More Posts
          </Button>
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-2">📬 Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 mb-6">
                Get the latest product updates, engineering insights, and meeting productivity tips delivered to your inbox.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Notice */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-700">
                🚧 <strong>Note:</strong> Individual blog posts are coming soon! 
                For now, check out our <Link href="/docs" className="text-blue-600 hover:underline">documentation</Link> for 
                detailed setup guides and product information.
              </p>
            </div>
          </CardContent>
        </Card>
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
              <Link href="/blog" className="hover:text-gray-900">Blog</Link>
              <Link href="/docs" className="hover:text-gray-900">Docs</Link>
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

