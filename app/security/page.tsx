import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Lock, Key, FileCheck, Server, Eye, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
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
          <Shield className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">
            Security & Trust
          </h1>
          <p className="text-xl text-blue-100">
            Your data security is our top priority. Learn how we protect your information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Security Overview */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Security</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We implement industry-standard security practices to ensure your meeting data 
            and business information remain safe and confidential.
          </p>
        </div>

        {/* Key Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">End-to-End Encryption</h3>
              <p className="text-sm text-gray-600">
                All data in transit protected with TLS 1.3
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Encrypted at Rest</h3>
              <p className="text-sm text-gray-600">
                Database encryption via Supabase
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Secure Authentication</h3>
              <p className="text-sm text-gray-600">
                OAuth 2.0 via Clerk with MFA support
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold mb-2">Regular Audits</h3>
              <p className="text-sm text-gray-600">
                Continuous security monitoring
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Security Measures */}
        <div className="space-y-8 mb-16">
          {/* Data Encryption */}
          <section>
            <h2 className="text-2xl font-bold mb-6">🔐 Data Encryption</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">In Transit (TLS 1.3)</h3>
                    <p className="text-gray-700">
                      All data transmitted between your browser and our servers is encrypted using 
                      industry-standard TLS 1.3 encryption. This includes meeting transcripts, 
                      action items, and authentication credentials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Server className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">At Rest (AES-256)</h3>
                    <p className="text-gray-700">
                      Your data is encrypted at rest in our Supabase PostgreSQL database using 
                      AES-256 encryption. Backups are also encrypted with the same standards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Authentication & Access Control */}
          <section>
            <h2 className="text-2xl font-bold mb-6">🔑 Authentication & Access Control</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge className="bg-blue-600">OAuth 2.0</Badge>
                    Secure Authentication
                  </h3>
                  <p className="text-gray-700">
                    We use Clerk for authentication, supporting Google, Microsoft, and Slack OAuth. 
                    No passwords are stored on our servers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Multi-Factor Authentication (MFA)</h3>
                  <p className="text-gray-700">
                    Optional MFA adds an extra layer of security. Enable it in your account settings 
                    for enhanced protection.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Role-Based Access Control (RBAC)</h3>
                  <p className="text-gray-700">
                    Team plans include granular permissions. Control who can view meetings, edit 
                    actions, or manage integrations.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Session Management</h3>
                  <p className="text-gray-700">
                    Sessions automatically expire after 7 days of inactivity. You can manually log 
                    out from all devices at any time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Infrastructure Security */}
          <section>
            <h2 className="text-2xl font-bold mb-6">🏗️ Infrastructure Security</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Hosting</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Deployed on <strong>Vercel</strong> with automatic HTTPS, DDoS protection, 
                      and edge caching.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Database</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Supabase</strong> provides enterprise-grade PostgreSQL with automatic 
                      backups and point-in-time recovery.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">CDN</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Static assets served via <strong>Vercel Edge Network</strong> with built-in 
                      security headers.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Monitoring</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      24/7 uptime monitoring and automated alerting for any security incidents.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Data Privacy & Compliance */}
          <section>
            <h2 className="text-2xl font-bold mb-6">📋 Data Privacy & Compliance</h2>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Data Access</h3>
                    <p className="text-gray-700">
                      Only authorized personnel can access production systems. All access is logged 
                      and audited. We never access your meeting data unless you explicitly request support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">GDPR Compliant</h3>
                    <p className="text-gray-700">
                      We comply with GDPR requirements. You can export or delete your data at any 
                      time. Data processing agreements available for enterprise customers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">SOC 2 Type II (Planned)</h3>
                    <p className="text-gray-700">
                      We're working towards SOC 2 Type II certification to meet enterprise security 
                      requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Third-Party Security */}
          <section>
            <h2 className="text-2xl font-bold mb-6">🤝 Third-Party Security</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">
                  We carefully vet all third-party services for security and compliance:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-1">Authentication</p>
                    <p className="text-sm text-gray-600">Clerk - SOC 2 Type II, ISO 27001</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-1">Database</p>
                    <p className="text-sm text-gray-600">Supabase - SOC 2 Type II, ISO 27001</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-1">AI Processing</p>
                    <p className="text-sm text-gray-600">OpenAI - SOC 2 Type II</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-semibold mb-1">Payments</p>
                    <p className="text-sm text-gray-600">Stripe - PCI DSS Level 1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Incident Response */}
          <section>
            <h2 className="text-2xl font-bold mb-6">🚨 Incident Response</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">24/7 Security Monitoring</h3>
                    <p className="text-gray-700">
                      Our systems are monitored 24/7 for suspicious activity, unauthorized access 
                      attempts, and potential security threats.
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  In the unlikely event of a security incident:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">1.</span>
                    <span>We contain and remediate the issue immediately</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">2.</span>
                    <span>Affected users are notified within 72 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">3.</span>
                    <span>We conduct a thorough investigation and post-mortem</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">4.</span>
                    <span>Preventive measures are implemented to avoid recurrence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Best Practices for Users */}
          <section>
            <h2 className="text-2xl font-bold mb-6">✅ Security Best Practices for Users</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 mb-4">Help us keep your account secure:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <div>
                      <p className="font-semibold">Use strong passwords</p>
                      <p className="text-sm text-gray-600">Or use OAuth (Google, Microsoft, Slack)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <div>
                      <p className="font-semibold">Enable MFA</p>
                      <p className="text-sm text-gray-600">Add extra protection to your account</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <div>
                      <p className="font-semibold">Keep software updated</p>
                      <p className="text-sm text-gray-600">Use the latest browser version</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <div>
                      <p className="font-semibold">Review access regularly</p>
                      <p className="text-sm text-gray-600">Check team members and integrations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <div>
                      <p className="font-semibold">Log out on shared devices</p>
                      <p className="text-sm text-gray-600">Don't stay signed in on public computers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <div>
                      <p className="font-semibold">Report suspicious activity</p>
                      <p className="text-sm text-gray-600">Contact us immediately if you notice anything unusual</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Security Contact */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-2xl">🔒 Report a Security Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-700 mb-6">
              If you discover a security vulnerability, please report it to us immediately.
            </p>
            <div className="text-center space-y-2 mb-6">
              <p className="text-gray-700">
                <strong>Security Email:</strong> <a href="mailto:security@meetingactions.com" className="text-blue-600 hover:underline">security@meetingactions.com</a>
              </p>
              <p className="text-sm text-gray-600">
                We take all reports seriously and will respond within 24 hours.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/privacy">
                <Button size="lg" variant="outline">
                  Privacy Policy
                </Button>
              </Link>
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
              <Link href="/security" className="hover:text-gray-900">Security</Link>
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
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

