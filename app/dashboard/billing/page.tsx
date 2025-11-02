import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Zap, CreditCard, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { PRICING_TIERS } from '@/lib/config';

export default async function BillingPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // TODO: Fetch real workspace and billing data
  const currentPlan = 'free';
  const usage = {
    meetings: 3,
    actions: 12,
    limit: 10,
  };

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
            </div>
            <div className="flex items-center gap-4">
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing & Usage</h1>
          <p className="text-gray-600">
            Manage your subscription and track usage.
          </p>
        </div>

        {/* Current Plan */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the <strong className="capitalize">{currentPlan}</strong> plan
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {currentPlan === 'free' ? 'Free' : currentPlan === 'pro' ? 'Pro - $19/mo' : 'Team - $99/mo'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {currentPlan === 'free' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Usage this month</p>
                    <p className="text-sm text-gray-600">{usage.meetings} of {usage.limit} meetings processed</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{Math.round((usage.meetings / usage.limit) * 100)}%</div>
                    <p className="text-sm text-gray-600">of limit</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button className="flex-1">
                    Upgrade to Pro
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Upgrade to Team
                  </Button>
                </div>
              </div>
            )}

            {currentPlan !== 'free' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-medium">Unlimited meetings and actions</p>
                    <p className="text-sm text-gray-600">Your subscription renews on Dec 1, 2025</p>
                  </div>
                </div>
                
                <Button variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Subscription
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier, idx) => (
              <Card 
                key={idx}
                className={`relative ${
                  tier.name.toLowerCase() === currentPlan 
                    ? 'border-2 border-blue-600' 
                    : tier.popular 
                    ? 'border-2 border-blue-300' 
                    : ''
                }`}
              >
                {tier.popular && tier.name.toLowerCase() !== currentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                {tier.name.toLowerCase() === currentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="secondary">Current Plan</Badge>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    {tier.price > 0 && <span className="text-gray-600">/month</span>}
                  </div>
                  
                  <ul className="space-y-2 mb-6 text-sm">
                    {tier.features.slice(0, 5).map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {tier.name.toLowerCase() !== currentPlan && (
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? 'default' : 'outline'}
                    >
                      {tier.price === 0 ? 'Downgrade' : 'Upgrade'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>Track your activity and limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Meetings Processed</p>
                  <p className="text-sm text-gray-600">Total meetings with AI extraction</p>
                </div>
                <div className="text-2xl font-bold">{usage.meetings}</div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Actions Created</p>
                  <p className="text-sm text-gray-600">Auto-generated action items</p>
                </div>
                <div className="text-2xl font-bold">{usage.actions}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

