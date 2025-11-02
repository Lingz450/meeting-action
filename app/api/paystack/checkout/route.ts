import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createPaystackTransaction, PaystackCurrency } from '@/lib/paystack';

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan, currency } = await req.json();

    if (!plan || !['pro', 'team'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Default to USD if no currency specified
    const paymentCurrency: PaystackCurrency = currency || 'USD';

    // Create Paystack transaction
    const transaction = await createPaystackTransaction({
      userId: user.id,
      userEmail: user.emailAddresses[0]?.emailAddress || '',
      plan: plan as 'pro' | 'team',
      currency: paymentCurrency,
    });

    return NextResponse.json({ 
      url: transaction.authorization_url,
      reference: transaction.reference,
    });
  } catch (error) {
    console.error('Error creating Paystack transaction:', error);
    
    // Check if it's a configuration error
    if (error instanceof Error) {
      if (error.message.includes('PAYSTACK_SECRET_KEY') || error.message.includes('placeholder')) {
        return NextResponse.json(
          { 
            error: '🌍 Paystack is not configured yet',
            details: error.message.includes('placeholder') 
              ? error.message 
              : 'Add your Paystack API keys to .env.local to enable African payments. See PAYSTACK_SETUP.md for instructions.'
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
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}

