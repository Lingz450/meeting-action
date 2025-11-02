# Paystack Integration Setup

## 🌍 Why Paystack?

Paystack is integrated specifically for **African markets** where it offers:
- ✅ Better conversion rates (vs international payment processors)
- ✅ Local payment methods (Mobile Money, USSD, Bank Transfer)
- ✅ Support for local currencies (NGN, GHS, ZAR, KES)
- ✅ Lower transaction fees in supported countries

## 🚀 Quick Setup

### 1. Create Paystack Account

1. Go to [Paystack.com](https://paystack.com)
2. Sign up (Nigeria, Ghana, South Africa, or Kenya)
3. Complete KYC verification
4. Activate your live account

### 2. Get API Keys

1. Dashboard → Settings → API Keys & Webhooks
2. Copy your **Secret Key** and **Public Key**
3. Add to `.env.local`:

```bash
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
```

### 3. Set Up Webhook

1. In Paystack Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://your-domain.com/api/webhooks/paystack`
3. Subscribe to these events:
   - `charge.success`
   - `subscription.create`
   - `subscription.disable`
4. Save

## 💰 Pricing by Currency

### Pro Plan ($19/month equivalent)
- 🇳🇬 Nigeria: **₦45,000/month**
- 🇬🇭 Ghana: **GH₵120/month**
- 🇿🇦 South Africa: **R350/month**
- 💵 USD: **$19/month**

### Team Plan ($99/month equivalent)
- 🇳🇬 Nigeria: **₦235,000/month**
- 🇬🇭 Ghana: **GH₵625/month**
- 🇿🇦 South Africa: **R1,825/month**
- 💵 USD: **$99/month**

**Note**: Prices are approximate conversions and updated based on exchange rates.

## 🎯 How Users Choose Payment Method

When users click **Upgrade**, they see a dropdown with payment options:

### International Users
- **💳 Stripe** - International cards

### African Users
- **🇳🇬 Pay with NGN** - Nigerian Naira (Paystack)
- **🇬🇭 Pay with GHS** - Ghanaian Cedi (Paystack)
- **🇿🇦 Pay with ZAR** - South African Rand (Paystack)
- **💵 Pay with USD** - US Dollars (Paystack)

## 📱 Supported Payment Methods (Paystack)

### Cards
- Visa, Mastercard, Verve

### Bank Transfer
- Direct bank transfer (Nigeria only)

### USSD
- Dial USSD code to pay (Nigeria only)

### Mobile Money
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money
- Ghana only

## 🔄 Payment Flow

### New Subscription
1. User clicks **Upgrade** → Chooses currency
2. Redirected to Paystack checkout
3. Completes payment
4. Redirected back to dashboard
5. Webhook confirms payment
6. User subscription activated

### Callback URL
After payment, users are redirected to:
- **Success**: `/dashboard?payment=success`
- **Failed**: `/dashboard/billing?payment=failed`
- **Error**: `/dashboard/billing?error=verification_failed`

## 🛠️ Technical Details

### Files Created
- `lib/paystack.ts` - Paystack service layer
- `app/api/paystack/checkout/route.ts` - Initialize payment
- `app/api/paystack/callback/route.ts` - Handle redirects
- `app/api/webhooks/paystack/route.ts` - Handle webhooks
- `components/upgrade-button.tsx` - Updated with payment options

### Environment Variables
```bash
PAYSTACK_SECRET_KEY=sk_test_... # Required
PAYSTACK_PUBLIC_KEY=pk_test_... # Required
```

### Webhook Signature Verification
Paystack webhooks are verified using `x-paystack-signature` header and HMAC SHA512.

## 🧪 Testing

### Test Cards (Paystack)

**Successful Payment**
- Card: `4084 0840 8408 4081`
- CVV: Any 3 digits
- Expiry: Any future date
- PIN: `0000`

**Failed Payment**
- Card: `5060 6666 6666 6666`
- CVV: Any 3 digits
- Expiry: Any future date

### Test in Development
1. Start dev server: `npm run dev`
2. Go to billing page
3. Click **Upgrade** dropdown
4. Select a currency option
5. Use test card above

## 🌐 Go Live Checklist

- [ ] Complete Paystack KYC verification
- [ ] Switch to live API keys (remove `_test_`)
- [ ] Update webhook URL to production domain
- [ ] Test live payment with real card (small amount)
- [ ] Set up bank account for payouts
- [ ] Enable auto-settlement in Paystack dashboard

## ⚠️ Important Notes

1. **Currency Lock**: Once a customer pays in a currency, keep them in that currency
2. **Refunds**: Handle through Paystack dashboard (not automated)
3. **Failed Payments**: Paystack automatically retries for subscriptions
4. **Support**: Users can contact Paystack support directly for payment issues

## 🔧 Troubleshooting

### "Paystack is not configured"
**Solution**: Add `PAYSTACK_SECRET_KEY` to `.env.local`

### "Transaction verification failed"
**Solution**: Check webhook signature and ensure webhook URL is correct

### "Invalid currency"
**Solution**: Ensure currency is one of: NGN, GHS, ZAR, USD

## 📞 Support

- **Paystack Docs**: https://paystack.com/docs
- **Paystack Support**: support@paystack.com
- **Test Environment**: https://dashboard.paystack.com/#/test

---

**🎉 You're all set!** African users can now pay in their local currency with their preferred payment method.

