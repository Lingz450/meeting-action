import Paystack from 'paystack-api';

// Lazy initialization to avoid errors during build
let _paystack: Paystack | null = null;

function getPaystack(): Paystack {
  if (!_paystack) {
    const key = process.env.PAYSTACK_SECRET_KEY;
    if (!key) {
      throw new Error('PAYSTACK_SECRET_KEY is not set');
    }
    
    // Check for placeholder/dummy keys
    if (key.includes('your_key_here') || key.includes('your_paystack_key') || key.includes('***') || key.length < 20) {
      throw new Error('PAYSTACK_SECRET_KEY is set to a placeholder value. Please add your real Paystack API key from https://dashboard.paystack.com');
    }
    
    _paystack = Paystack(key);
  }
  return _paystack;
}

/**
 * Paystack pricing (converted to African currencies)
 * NGN: Nigerian Naira, GHS: Ghanaian Cedi, ZAR: South African Rand
 */
export const PAYSTACK_PRICES = {
  pro: {
    NGN: 850000, // ~$19 USD (45,000 NGN)
    GHS: 11400, // ~$19 USD (120 GHS)
    ZAR: 35000, // ~$19 USD (350 ZAR)
    USD: 1900, // $19 in cents
  },
  team: {
    NGN: 4450000, // ~$99 USD (235,000 NGN)
    GHS: 59400, // ~$99 USD (625 GHS)
    ZAR: 182500, // ~$99 USD (1,825 ZAR)
    USD: 9900, // $99 in cents
  },
};

export type PaystackCurrency = 'NGN' | 'GHS' | 'ZAR' | 'USD';

/**
 * Create a Paystack transaction for subscription
 */
export async function createPaystackTransaction({
  userId,
  userEmail,
  plan,
  currency = 'USD',
}: {
  userId: string;
  userEmail: string;
  plan: 'pro' | 'team';
  currency?: PaystackCurrency;
}) {
  const paystack = getPaystack();

  // Get the price based on plan and currency
  const amount = PAYSTACK_PRICES[plan][currency];

  // Create transaction
  const response = await paystack.transaction.initialize({
    email: userEmail,
    amount: amount, // Amount in kobo/pesewas/cents
    currency: currency,
    callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/paystack/callback`,
    metadata: {
      user_id: userId,
      plan: plan,
      cancel_action: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
    },
    channels: ['card', 'bank', 'ussd', 'mobile_money'], // Support multiple payment methods
  });

  if (!response.status) {
    throw new Error('Failed to create Paystack transaction');
  }

  return {
    authorization_url: response.data.authorization_url,
    access_code: response.data.access_code,
    reference: response.data.reference,
  };
}

/**
 * Verify Paystack transaction
 */
export async function verifyPaystackTransaction(reference: string) {
  const paystack = getPaystack();
  
  const response = await paystack.transaction.verify(reference);
  
  if (!response.status) {
    throw new Error('Failed to verify transaction');
  }

  return {
    success: response.data.status === 'success',
    amount: response.data.amount,
    currency: response.data.currency,
    metadata: response.data.metadata,
    customer: response.data.customer,
  };
}

/**
 * Verify Paystack webhook signature
 */
export function verifyPaystackWebhook(body: string, signature: string): boolean {
  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');
  return hash === signature;
}

// Export getPaystack for direct access when needed
export { getPaystack as paystack };

