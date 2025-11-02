import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackWebhook } from '@/lib/paystack';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      console.error('No signature found in Paystack webhook');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook signature
    const isValid = verifyPaystackWebhook(body, signature);
    
    if (!isValid) {
      console.error('Invalid Paystack webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    console.log('Paystack webhook event:', event.event);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        // Payment successful
        const { reference, customer, amount, metadata } = event.data;
        console.log(`Payment successful: ${reference}, Amount: ${amount}`);
        
        // TODO: Update user's subscription in database
        // await updateUserSubscription(metadata.user_id, metadata.plan);
        break;

      case 'subscription.create':
        // Subscription created
        console.log('Subscription created:', event.data);
        break;

      case 'subscription.disable':
        // Subscription cancelled
        console.log('Subscription cancelled:', event.data);
        // TODO: Update user's subscription status in database
        break;

      default:
        console.log(`Unhandled Paystack event: ${event.event}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Paystack webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

