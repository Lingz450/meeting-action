import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase/client';
import { headers } from 'next/headers';

/**
 * Stripe Webhook Handler
 * Handles subscription events (created, updated, canceled)
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  try {
    const event = verifyWebhookSignature(body, signature);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as any);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as any);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as any);
        break;

      case 'invoice.payment_succeeded':
        // Payment successful - subscription remains active
        console.log('Payment succeeded:', event.data.object);
        break;

      case 'invoice.payment_failed':
        // Payment failed - might want to send notification
        console.log('Payment failed:', event.data.object);
        break;

      default:
        console.log('Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: any) {
  const workspaceId = session.metadata.workspace_id;
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  // Update workspace with Stripe customer and subscription IDs
  const { error } = await supabaseAdmin
    .from('workspaces')
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('id', workspaceId);

  if (error) {
    console.error('Failed to update workspace:', error);
  }
}

async function handleSubscriptionUpdated(subscription: any) {
  const customerId = subscription.customer;
  
  // Find workspace by customer ID
  const { data: workspace, error: findError } = await supabaseAdmin
    .from('workspaces')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (findError || !workspace) {
    console.error('Workspace not found:', findError);
    return;
  }

  // Determine plan from price ID
  let plan: 'free' | 'pro' | 'team' = 'free';
  const priceId = subscription.items.data[0]?.price.id;
  
  if (priceId === process.env.STRIPE_PRICE_ID_PRO) {
    plan = 'pro';
  } else if (priceId === process.env.STRIPE_PRICE_ID_TEAM) {
    plan = 'team';
  }

  // Update workspace
  const { error } = await supabaseAdmin
    .from('workspaces')
    .update({
      plan,
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', workspace.id);

  if (error) {
    console.error('Failed to update subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  const customerId = subscription.customer;

  // Find workspace and downgrade to free
  const { data: workspace, error: findError } = await supabaseAdmin
    .from('workspaces')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();

  if (findError || !workspace) {
    console.error('Workspace not found:', findError);
    return;
  }

  // Downgrade to free plan
  const { error } = await supabaseAdmin
    .from('workspaces')
    .update({
      plan: 'free',
      subscription_status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('id', workspace.id);

  if (error) {
    console.error('Failed to cancel subscription:', error);
  }
}

