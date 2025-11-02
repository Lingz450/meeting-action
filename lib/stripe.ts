import Stripe from 'stripe';

// Lazy initialization to avoid errors during build
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    
    // Check for placeholder/dummy keys
    if (key.includes('your_key_here') || key.includes('***') || key.length < 20) {
      throw new Error('STRIPE_SECRET_KEY is set to a placeholder value. Please add your real Stripe API key from https://dashboard.stripe.com/test/apikeys');
    }
    
    _stripe = new Stripe(key, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    });
  }
  return _stripe;
}

/**
 * Create a Stripe checkout session for subscription
 */
export async function createCheckoutSession(
  userId: string,
  workspaceId: string,
  priceId: string,
  customerEmail: string
) {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    metadata: {
      user_id: userId,
      workspace_id: workspaceId,
    },
    subscription_data: {
      metadata: {
        user_id: userId,
        workspace_id: workspaceId,
      },
    },
  });

  return session;
}

/**
 * Create a Stripe billing portal session
 */
export async function createPortalSession(customerId: string) {
  const stripe = getStripe();
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  return session;
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
}

// Export getStripe for direct access when needed
export { getStripe as stripe };
