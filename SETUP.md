# MeetingActions - Complete Setup Guide

This guide will walk you through setting up MeetingActions from scratch. Follow each step carefully.

## ⏱️ Estimated Time: 45-60 minutes

---

## 1. Prerequisites Setup (15 min)

### Node.js
```bash
# Check if installed
node --version  # Should be 18+
npm --version

# If not installed, download from: https://nodejs.org
```

### Git
```bash
# Check if installed
git --version

# If not installed, download from: https://git-scm.com
```

---

## 2. Project Setup (5 min)

```bash
# Navigate to project
cd meeting-actions

# Install dependencies
npm install

# Verify installation
npm run dev
# Should start (but will error without env vars)
# Press Ctrl+C to stop
```

---

## 3. Supabase Setup (10 min)

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: meetingactions
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Wait 2-3 minutes for provisioning

### Run Database Schema
1. In Supabase dashboard, click "SQL Editor"
2. Open `lib/supabase/schema.sql` in your code editor
3. Copy ALL contents
4. Paste into Supabase SQL Editor
5. Click "Run"
6. Should see: "Success. No rows returned"

### Get API Keys
1. Go to Project Settings → API
2. Copy these values:
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)
   - **service_role key**: `eyJhbG...` (different long string)
3. Save these for `.env.local`

---

## 4. Clerk Setup (10 min)

### Create Application
1. Go to [clerk.com](https://clerk.com)
2. Sign up / Sign in
3. Click "Add application"
4. Name: **MeetingActions**
5. Select authentication methods:
   - ✅ Email
   - ✅ Google
   - ✅ Microsoft
6. Click "Create"

### Configure OAuth
1. Go to "Configure" → "Social Connections"
2. Enable **Google**:
   - Click "Enable"
   - Use Clerk's dev keys (or add your own later)
3. Enable **Microsoft**:
   - Click "Enable"
   - Use Clerk's dev keys

### Set Redirect URLs
1. Go to "Configure" → "Paths"
2. Set these:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/dashboard`
   - After sign-up: `/onboarding`

### Get API Keys
1. Go to "API Keys"
2. Copy:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`
3. Save for `.env.local`

---

## 5. OpenAI Setup (5 min)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Sign in
3. Go to "API Keys"
4. Click "Create new secret key"
5. Name it: **MeetingActions**
6. Copy the key: `sk-...`
7. **IMPORTANT**: Save immediately (can't view again!)
8. Add $5-10 credit to your account (Settings → Billing)

---

## 6. Stripe Setup (10 min)

### Create Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up / Sign in
3. Activate test mode (toggle in top right)

### Create Products
1. Go to "Products" → "Add Product"

**Product 1: Pro**
- Name: `MeetingActions Pro`
- Price: `$19.00` USD
- Billing period: `Monthly`
- Click "Save product"
- **Copy Price ID**: `price_xxx...`

**Product 2: Team**
- Name: `MeetingActions Team`
- Price: `$99.00` USD
- Billing period: `Monthly`
- Click "Save product"
- **Copy Price ID**: `price_xxx...`

### Get API Keys
1. Go to "Developers" → "API Keys"
2. Copy:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### Webhook Setup (do this after deploying)
Will configure later when app is live.

---

## 7. Create .env.local (5 min)

Create a file named `.env.local` in the project root:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_KEY_HERE

# OpenAI
OPENAI_API_KEY=sk-YOUR_KEY_HERE

# Anthropic (optional - for future use)
ANTHROPIC_API_KEY=

# Zoom (optional - configure when ready)
ZOOM_WEBHOOK_SECRET_TOKEN=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=

# Slack (optional - configure when ready)
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
SLACK_SIGNING_SECRET=

# Linear (optional - configure when ready)
LINEAR_CLIENT_ID=
LINEAR_CLIENT_SECRET=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_PRO=price_YOUR_PRO_PRICE_ID
STRIPE_PRICE_ID_TEAM=price_YOUR_TEAM_PRICE_ID
```

**Replace all `YOUR_KEY_HERE` values with real keys!**

---

## 8. Test Locally (5 min)

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Test Checklist:
- ✅ Landing page loads
- ✅ Click "Sign Up" → Clerk signup works
- ✅ Complete signup
- ✅ Redirects to dashboard
- ✅ Dashboard shows empty state
- ✅ Go to Integrations page

If all works → You're ready! 🎉

---

## 9. Integration Setup (Optional - Configure Later)

### Zoom Integration

1. Go to [Zoom App Marketplace](https://marketplace.zoom.us)
2. Click "Develop" → "Build App"
3. Choose "Meeting SDK"
4. Fill in app details
5. In "Webhooks", add events:
   - `recording.completed`
   - `meeting.ended`
6. Set endpoint: `https://YOUR_DOMAIN/api/webhooks/zoom`
7. Copy credentials to `.env.local`

### Slack Integration

1. Go to [Slack API](https://api.slack.com/apps)
2. Click "Create New App" → "From scratch"
3. Name: **MeetingActions**
4. Choose workspace
5. Add OAuth Scopes:
   - `chat:write`
   - `channels:read`
   - `groups:read`
6. Set redirect URL: `http://localhost:3000/api/integrations/slack/callback`
7. Copy credentials to `.env.local`

### Linear Integration

1. Go to [Linear Settings](https://linear.app/settings/api)
2. Create OAuth application
3. Set redirect: `http://localhost:3000/api/integrations/linear/callback`
4. Scopes: `read`, `write`
5. Copy credentials to `.env.local`

---

## 10. Deploy to Vercel (Optional)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
# Set environment variables in Vercel dashboard
```

### Post-Deployment:
1. Update webhook URLs in Zoom, Slack, etc.
2. Configure Stripe webhook
3. Test production integrations

---

## 🎯 Next Steps

1. **Create your first workspace** in the dashboard
2. **Connect Zoom** to receive meeting transcripts
3. **Connect Slack** to post summaries
4. **Have a meeting** and watch magic happen!

---

## 🆘 Troubleshooting

### Error: "Clerk not configured"
→ Check `.env.local` has correct Clerk keys  
→ Restart dev server: `npm run dev`

### Error: "Supabase connection failed"
→ Verify Supabase URL and keys  
→ Check if database schema was run

### Error: "OpenAI API error"
→ Verify API key is correct  
→ Check if you have credits in OpenAI account

### Clerk signup shows error
→ Check social connections are enabled in Clerk dashboard  
→ Verify redirect URLs are correct

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Stripe Docs](https://stripe.com/docs)

---

## 💬 Need Help?

Open an issue on GitHub or email: support@meetingactions.com

Happy building! 🚀

