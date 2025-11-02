import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createCheckoutSession } from '@/lib/stripe';
import { PRICING_TIERS } from '@/lib/config';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await req.json();

    if (!plan || !['pro', 'team'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Get the price ID from config
    const tier = PRICING_TIERS.find(t => t.name.toLowerCase() === plan);
    
    if (!tier || !tier.priceId) {
      return NextResponse.json(
        { error: 'Stripe price ID not configured for this plan' },
        { status: 400 }
      );
    }

    // TODO: Get or create workspace ID from database
    const tempWorkspaceId = 'temp-workspace-id';

    // Create Stripe checkout session
    const session = await createCheckoutSession(
      user.id,
      tempWorkspaceId,
      tier.priceId,
      user.emailAddresses[0]?.emailAddress || ''
    );

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // Check if it's a configuration error
    if (error instanceof Error) {
      if (error.message.includes('STRIPE_SECRET_KEY') || error.message.includes('apiKey') || error.message.includes('placeholder')) {
        return NextResponse.json(
          { 
            error: '💳 Stripe is not configured yet',
            details: error.message.includes('placeholder') 
              ? error.message 
              : 'Add your Stripe API keys to .env.local to enable payments. See README.md for setup instructions.'
          },
          { status: 503 }
        );
      }
      
      // Return the actual error message for better debugging
      return NextResponse.json(
        { 
          error: 'Payment setup error',
          details: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

