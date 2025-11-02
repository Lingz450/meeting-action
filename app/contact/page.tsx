import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Mail, MessageSquare, Github, Send } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
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
              <Link href="/blog">
                <Button variant="ghost">Blog</Button>
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
            💬 Get In Touch
          </h1>
          <p className="text-xl text-blue-100">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us what you need help with..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  🚧 Note: Form submission is not yet implemented. For now, please email us directly.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            
            {/* Email */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Email</CardTitle>
                    <CardDescription>Our friendly team is here to help</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a href="mailto:support@meetingactions.com" className="text-blue-600 hover:underline">
                  support@meetingactions.com
                </a>
              </CardContent>
            </Card>

            {/* GitHub */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Github className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">GitHub</CardTitle>
                    <CardDescription>View our code and report issues</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://github.com/Lingz450/meeting-action" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/Lingz450/meeting-action
                </a>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Documentation</CardTitle>
                    <CardDescription>Find answers in our docs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/docs" className="text-blue-600 hover:underline">
                  View Documentation
                </Link>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/docs" className="block text-blue-600 hover:underline">
                    📖 Documentation
                  </Link>
                  <Link href="/about" className="block text-blue-600 hover:underline">
                    ℹ️ About Us
                  </Link>
                  <Link href="/blog" className="block text-blue-600 hover:underline">
                    📝 Blog
                  </Link>
                  <a 
                    href="https://github.com/Lingz450/meeting-action/issues" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline"
                  >
                    🐛 Report a Bug
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sign up for a free account, connect your Zoom or Teams, and you'll receive your first 
                  meeting summary within 2 minutes of your next meeting!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What integrations do you support?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We support Zoom, Microsoft Teams, Slack, Linear, Asana, and Jira. More integrations 
                  coming soon!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! Our Free plan includes 10 meetings per month forever. Pro and Team plans come 
                  with a 14-day free trial.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How secure is my data?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We use industry-standard encryption and store data on secure Supabase servers. 
                  We never share your meeting data with third parties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="py-12">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl text-blue-100 mb-8">
                Join teams using MeetingActions to turn meeting talk into shipped tasks
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Free Trial
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
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
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

