import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
              <Link href="/privacy">
                <Button variant="ghost">Privacy</Button>
              </Link>
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
            📜 Terms of Service
          </h1>
          <p className="text-xl text-blue-100">
            Please read these terms carefully before using MeetingActions
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
              These Terms of Service ("Terms") govern your access to and use of MeetingActions 
              ("Service", "we", "our", or "us"). By using our Service, you agree to these Terms.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  By creating an account or using MeetingActions, you agree to be bound by these Terms, 
                  our Privacy Policy, and all applicable laws and regulations.
                </p>
                <p className="text-gray-700">
                  If you do not agree with any of these terms, you are prohibited from using or 
                  accessing this service.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  MeetingActions provides AI-powered meeting analysis, action item extraction, and 
                  integration with productivity tools including:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Meeting transcript processing from Zoom and Microsoft Teams</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>AI-powered action item extraction using GPT-4</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Integration with Slack, Linear, Asana, and Jira</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Team analytics and reporting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Registration</h3>
                  <p className="text-gray-700">
                    You must provide accurate and complete information when creating an account. 
                    You are responsible for maintaining the security of your account credentials.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Account Responsibility</h3>
                  <p className="text-gray-700">
                    You are responsible for all activity that occurs under your account. Notify us 
                    immediately of any unauthorized use.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Age Requirement</h3>
                  <p className="text-gray-700">
                    You must be at least 13 years old to use this service. If you are under 18, 
                    you must have parental consent.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Subscription Plans & Billing</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Plans</h3>
                  <p className="text-gray-700 mb-2">We offer three subscription tiers:</p>
                  <ul className="space-y-1 text-gray-700 ml-4">
                    <li>• <strong>Free:</strong> 10 meetings/month, basic features</li>
                    <li>• <strong>Pro ($19/month):</strong> Unlimited meetings, all integrations</li>
                    <li>• <strong>Team ($99/month):</strong> Up to 20 users, advanced features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Payment</h3>
                  <p className="text-gray-700">
                    Subscriptions are billed monthly or annually in advance. We accept payments 
                    via Stripe (international) and Paystack (African markets).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Refunds</h3>
                  <p className="text-gray-700">
                    We offer a 14-day money-back guarantee for first-time subscribers. Contact us 
                    within 14 days of purchase for a full refund.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Cancellation</h3>
                  <p className="text-gray-700">
                    You may cancel your subscription at any time. Your access will continue until 
                    the end of the current billing period.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">You agree NOT to:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Use the Service for any illegal purpose</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Violate any laws or regulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Share your account credentials with others</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Attempt to gain unauthorized access to our systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Upload malicious code or viruses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Reverse engineer or copy our software</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">✗</span>
                    <span>Abuse or overload our infrastructure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Our Content</h3>
                  <p className="text-gray-700">
                    The Service, including all software, designs, text, graphics, and other content, 
                    is owned by MeetingActions and protected by copyright and trademark laws.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Your Content</h3>
                  <p className="text-gray-700">
                    You retain ownership of your meeting data and content. By using our Service, 
                    you grant us a license to process and analyze your content to provide the Service.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Feedback</h3>
                  <p className="text-gray-700">
                    If you provide feedback or suggestions, we may use them without obligation or 
                    compensation to you.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Data & Privacy</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  We take your privacy seriously. Our collection and use of your data is governed 
                  by our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                </p>
                <p className="text-gray-700">
                  Key points:
                </p>
                <ul className="space-y-2 text-gray-700 mt-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We encrypt data in transit and at rest</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>We never sell your data to third parties</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You can export or delete your data at any time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Disclaimers</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
                </p>
                <p className="text-gray-700 mb-4">
                  We do not guarantee that:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• The Service will be uninterrupted or error-free</li>
                  <li>• All bugs will be corrected immediately</li>
                  <li>• The Service will meet your specific requirements</li>
                  <li>• AI-generated content will be 100% accurate</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, MEETINGACTIONS SHALL NOT BE LIABLE FOR ANY 
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF 
                  PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, 
                  USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Termination</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <p className="text-gray-700">
                  We reserve the right to suspend or terminate your access to the Service at any 
                  time for:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Violation of these Terms</li>
                  <li>• Non-payment of fees</li>
                  <li>• Fraudulent or illegal activity</li>
                  <li>• Abuse of the Service</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Upon termination, your right to use the Service will immediately cease. We may 
                  delete your data after 30 days of account termination.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  We may modify these Terms at any time. We will notify you of material changes via 
                  email or through the Service. Your continued use after changes constitutes acceptance 
                  of the new Terms.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  These Terms shall be governed by and construed in accordance with the laws of 
                  [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold mb-4">13. Contact</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> <a href="mailto:legal@meetingactions.com" className="text-blue-600 hover:underline">legal@meetingactions.com</a></p>
                  <p><strong>Support:</strong> <a href="mailto:support@meetingactions.com" className="text-blue-600 hover:underline">support@meetingactions.com</a></p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-gray-700 mb-6">
                By signing up, you agree to these Terms of Service and our Privacy Policy
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/sign-up">
                  <Button size="lg">
                    Create Account
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button size="lg" variant="outline">
                    Read Privacy Policy
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
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
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

