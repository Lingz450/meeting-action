import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Calendar, ArrowLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Blog posts data (same as in blog/page.tsx)
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

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
              <Link href="/blog">
                <Button variant="ghost">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white">{post.category}</Badge>
            <span className="text-sm text-blue-100 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="text-sm text-blue-100">•</span>
            <span className="text-sm text-blue-100">{post.readTime}</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-blue-100">{post.excerpt}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">📝 Full Article Coming Soon!</h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                We're working on publishing the complete article. In the meantime, check out our 
                comprehensive documentation to learn more about MeetingActions.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/docs">
                  <Button size="lg">
                    View Documentation
                  </Button>
                </Link>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">More Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {posts
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost, idx) => (
                <Link key={idx} href={`/blog/${relatedPost.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{relatedPost.category}</Badge>
                        <span className="text-xs text-gray-500">{relatedPost.readTime}</span>
                      </div>
                      <h4 className="font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600">{relatedPost.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">
                Ready to Transform Your Meetings?
              </h3>
              <p className="text-blue-100 mb-6">
                Start turning meeting talk into shipped tasks automatically
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
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

