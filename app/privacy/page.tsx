import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
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
              <Link href="/contact">
                <Button variant="ghost">Contact</Button>
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
            🔒 Privacy Policy
          </h1>
          <p className="text-xl text-blue-100">
            Your privacy is important to us. Learn how we collect, use, and protect your data.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-4">
              <strong>Last Updated:</strong> November 2, 2025
            </p>
            <p className="text-gray-700">
              This Privacy Policy describes how MeetingActions ("we", "our", or "us") collects, 
              uses, and shares your information when you use our service.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <p className="text-gray-700">
                    When you sign up, we collect your name, email address, and authentication 
                    information through Clerk.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Meeting Data</h3>
                  <p className="text-gray-700">
                    We process meeting transcripts, participant names, and extracted action items 
                    from your Zoom and Microsoft Teams meetings.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Usage Information</h3>
                  <p className="text-gray-700">
                    We collect information about how you use our service, including features accessed, 
                    integrations connected, and performance data.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Payment Information</h3>
                  <p className="text-gray-700">
                    Payment details are processed securely by Stripe and Paystack. We do not store 
                    your full credit card information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To provide and improve our AI-powered meeting analysis service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To process meeting transcripts and extract action items</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To integrate with your connected tools (Slack, Linear, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To send you meeting summaries and notifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To process payments and manage subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To communicate with you about service updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>To analyze usage patterns and improve our service</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Data Security</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-700">
                  We take data security seriously and implement industry-standard measures to 
                  protect your information:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>End-to-end encryption for data in transit (HTTPS/TLS)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Data at rest encryption using Supabase</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Secure authentication via Clerk</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Regular security audits and updates</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Access controls and role-based permissions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-700">
                  We use the following trusted third-party services to operate our platform:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Authentication</p>
                    <p className="text-sm text-gray-600">Clerk</p>
                  </div>
                  <div>
                    <p className="font-semibold">Database</p>
                    <p className="text-sm text-gray-600">Supabase (PostgreSQL)</p>
                  </div>
                  <div>
                    <p className="font-semibold">AI Processing</p>
                    <p className="text-sm text-gray-600">OpenAI GPT-4</p>
                  </div>
                  <div>
                    <p className="font-semibold">Payments</p>
                    <p className="text-sm text-gray-600">Stripe & Paystack</p>
                  </div>
                  <div>
                    <p className="font-semibold">Hosting</p>
                    <p className="text-sm text-gray-600">Vercel</p>
                  </div>
                  <div>
                    <p className="font-semibold">Integrations</p>
                    <p className="text-sm text-gray-600">Zoom, Teams, Slack, Linear</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Sharing</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-700">
                  We do <strong>not</strong> sell your personal information. We may share your 
                  data in the following limited circumstances:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>With your team:</strong> Meeting data is shared with workspace members</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>With connected tools:</strong> When you integrate Slack, Linear, etc.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Service providers:</strong> To operate and improve our service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Legal requirements:</strong> When required by law</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Access your personal data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Correct inaccurate data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Delete your account and data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Export your data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Opt-out of marketing communications</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, contact us at <a href="mailto:privacy@meetingactions.com" className="text-blue-600 hover:underline">privacy@meetingactions.com</a>
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  We retain your data for as long as your account is active or as needed to 
                  provide services. When you delete your account, we will delete your personal 
                  data within 30 days, except where we are required to retain it for legal 
                  compliance.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  Our service is not directed to children under 13. We do not knowingly collect 
                  personal information from children under 13. If you believe we have collected 
                  such information, please contact us immediately.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new policy on this page and updating the "Last Updated" 
                  date. We encourage you to review this policy periodically.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:privacy@meetingactions.com" className="text-blue-600 hover:underline">privacy@meetingactions.com</a></p>
                  <p><strong>Support:</strong> <a href="mailto:support@meetingactions.com" className="text-blue-600 hover:underline">support@meetingactions.com</a></p>
                  <p><strong>Address:</strong> [Your Company Address]</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Questions About Privacy?</h3>
              <p className="text-gray-700 mb-6">
                We're here to help. Contact us if you have any questions or concerns.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button size="lg" variant="outline">
                    View Documentation
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
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
              <Link href="/blog" className="hover:text-gray-900">Blog</Link>
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

