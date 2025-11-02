import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackTransaction } from '@/lib/paystack';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.redirect(
        new URL('/dashboard/billing?error=no_reference', req.url)
      );
    }

    // Verify the transaction
    const verification = await verifyPaystackTransaction(reference);

    if (verification.success) {
      // TODO: Update user's subscription in database
      const userId = verification.metadata.user_id;
      const plan = verification.metadata.plan;
      
      console.log(`Payment successful for user ${userId}, plan: ${plan}`);
      
      // Redirect to success page
      return NextResponse.redirect(
        new URL('/dashboard?payment=success', req.url)
      );
    } else {
      // Payment failed
      return NextResponse.redirect(
        new URL('/dashboard/billing?payment=failed', req.url)
      );
    }
  } catch (error) {
    console.error('Error verifying Paystack payment:', error);
    return NextResponse.redirect(
      new URL('/dashboard/billing?error=verification_failed', req.url)
    );
  }
}

