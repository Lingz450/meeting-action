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
    if (error instanceof Error && error.message.includes('PAYSTACK_SECRET_KEY')) {
      return NextResponse.json(
        { error: 'Paystack is not configured. Please add your Paystack keys to .env.local' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create payment session' },
      { status: 500 }
    );
  }
}

