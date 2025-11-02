import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, Target, CheckCircle, Video, Users, Clock, 
  ArrowRight, Sparkles, MessageSquare, CheckSquare 
} from 'lucide-react';
import { PRICING_TIERS, FEATURES, APP_CONFIG } from '@/lib/config';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">{APP_CONFIG.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#features" className="text-sm text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Start Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            <Zap className="h-3 w-3 mr-1" />
            Live in 2 minutes • No credit card
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Every meeting → <br />
            <span className="text-blue-600">Shipped tasks</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {APP_CONFIG.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 h-14">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                <Video className="mr-2 h-5 w-5" />
                Watch Demo (60s)
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>4.8/5 from 200+ teams</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Saves 4 hours/week per manager</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              From call to task in <span className="text-blue-600">2 minutes</span>
            </h2>
            <p className="text-xl text-gray-600">No more "we'll follow up" that never happens</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Meeting happens</h3>
                <p className="text-gray-600">
                  Your Zoom or Google Meet call runs as usual. Transcript captured automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-600 shadow-lg scale-105">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. AI extracts actions</h3>
                <p className="text-gray-600">
                  GPT-4 identifies decisions, owners, due dates, and next steps in seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Posted to your tools</h3>
                <p className="text-gray-600">
                  Clean summary → Slack. Tasks → Linear/Asana/Jira. Everyone knows what's next.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for teams that <span className="text-blue-600">ship</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => {
              const Icon = getIcon(feature.icon);
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">Start free. Scale when you're ready.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_TIERS.map((tier, idx) => (
              <Card 
                key={idx} 
                className={`relative ${tier.popular ? 'border-2 border-blue-600 shadow-xl scale-105' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-600">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    {tier.price > 0 && <span className="text-gray-600">/month</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/sign-up" className="block">
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? 'default' : 'outline'}
                      size="lg"
                    >
                      {tier.price === 0 ? 'Start Free' : 'Start 14-Day Trial'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stop losing follow-ups. Start shipping.
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 200+ teams turning meeting talk into real progress.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="text-lg px-12 h-14">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • 14-day trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="font-bold">{APP_CONFIG.name}</span>
              </div>
              <p className="text-sm text-gray-600">{APP_CONFIG.description}</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            © 2025 {APP_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function getIcon(name: string) {
  const icons: Record<string, any> = {
    zap: Zap,
    target: Target,
    'check-circle': CheckCircle,
    video: Video,
    users: Users,
    clock: Clock,
  };
  return icons[name] || Zap;
}
