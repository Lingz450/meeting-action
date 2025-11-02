# MeetingActions - Production Deployment Checklist

Use this checklist when deploying to production.

---

## Pre-Deployment Checklist

### 1. Environment Variables ✅

Verify all required env vars are set in production:

```bash
# Core
✅ NEXT_PUBLIC_APP_URL (production domain)
✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (production key)
✅ CLERK_SECRET_KEY (production key)
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ SUPABASE_SERVICE_ROLE_KEY
✅ OPENAI_API_KEY

# Integrations (optional at launch)
✅ ZOOM_WEBHOOK_SECRET_TOKEN
✅ ZOOM_CLIENT_ID
✅ ZOOM_CLIENT_SECRET
✅ SLACK_CLIENT_ID
✅ SLACK_CLIENT_SECRET
✅ SLACK_SIGNING_SECRET
✅ LINEAR_CLIENT_ID
✅ LINEAR_CLIENT_SECRET

# Payments
✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (production)
✅ STRIPE_SECRET_KEY (production)
✅ STRIPE_WEBHOOK_SECRET
✅ STRIPE_PRICE_ID_PRO
✅ STRIPE_PRICE_ID_TEAM
```

### 2. Database ✅

- [ ] Run `schema.sql` in Supabase production database
- [ ] Enable Row Level Security policies
- [ ] Set up database backups (Supabase → Settings → Backups)
- [ ] Create database indexes (already in schema.sql)

### 3. Clerk Configuration ✅

- [ ] Switch to production instance
- [ ] Update redirect URLs:
  - Sign-in: `https://yourdomain.com/sign-in`
  - Sign-up: `https://yourdomain.com/sign-up`
  - After sign-in: `https://yourdomain.com/dashboard`
- [ ] Configure production OAuth providers
- [ ] Set up email templates (branding)

### 4. Stripe Configuration ✅

- [ ] Switch to live mode
- [ ] Create live products (Pro, Team)
- [ ] Copy live price IDs
- [ ] Configure webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
- [ ] Select events:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- [ ] Copy webhook signing secret

### 5. Zoom Configuration ✅

- [ ] Submit app for review (if using production)
- [ ] Update webhook URL: `https://yourdomain.com/api/webhooks/zoom`
- [ ] Verify webhook signature validation is enabled
- [ ] Test with real meeting

### 6. Slack Configuration ✅

- [ ] Update OAuth redirect: `https://yourdomain.com/api/integrations/slack/callback`
- [ ] Submit app to Slack App Directory (optional)
- [ ] Test OAuth flow in production

### 7. Linear Configuration ✅

- [ ] Update OAuth redirect: `https://yourdomain.com/api/integrations/linear/callback`
- [ ] Test issue creation

---

## Deployment Steps (Vercel)

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Link Project

```bash
cd meeting-actions
vercel login
vercel link
```

### 3. Set Environment Variables

```bash
# Option A: Via CLI
vercel env add NEXT_PUBLIC_APP_URL production
# Paste value, press Enter
# Repeat for all variables

# Option B: Via Dashboard
# Go to Vercel dashboard → Project → Settings → Environment Variables
# Add all variables from .env.local
```

### 4. Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (if Git connected)
git push origin main
```

### 5. Verify Deployment

- [ ] Landing page loads
- [ ] Sign up flow works
- [ ] Dashboard accessible
- [ ] Integrations page loads
- [ ] No console errors

---

## Post-Deployment Tasks

### 1. Domain Configuration

```bash
# Add custom domain in Vercel
vercel domains add yourdomain.com

# Update DNS records (Vercel will show you what to add)
```

### 2. Test Critical Paths

- [ ] User can sign up
- [ ] User can sign in
- [ ] Dashboard loads data
- [ ] Zoom webhook receives events (test meeting)
- [ ] Slack integration OAuth works
- [ ] Linear integration OAuth works
- [ ] Stripe checkout works
- [ ] Stripe webhooks received

### 3. Configure Monitoring

#### Vercel Analytics
```bash
# Enable in Vercel dashboard
Project → Analytics
```

#### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### LogTail/Datadog (Logs)
- Set up structured logging
- Monitor API errors
- Alert on webhook failures

### 4. Performance Optimization

- [ ] Enable Vercel Speed Insights
- [ ] Check Lighthouse scores (should be 90+)
- [ ] Optimize images (use next/image)
- [ ] Enable Redis for rate limiting (upgrade from in-memory)

### 5. Security Hardening

- [ ] Enable CORS restrictions
- [ ] Set up rate limiting per IP
- [ ] Verify webhook signatures (Zoom, Stripe, Slack)
- [ ] Enable Supabase RLS policies
- [ ] Add CSP headers
- [ ] Set up DDoS protection (Cloudflare)

### 6. Backup Strategy

- [ ] Supabase automatic backups (daily)
- [ ] Export customer data weekly
- [ ] Store encrypted backups offsite

---

## Marketing Launch Checklist

### Pre-Launch

- [ ] Create demo video (60 seconds)
- [ ] Write 3-5 blog posts
- [ ] Set up analytics (Google Analytics/Plausible)
- [ ] Create social media accounts
- [ ] Prepare launch tweet/post
- [ ] Set up customer support (Intercom/Crisp)
- [ ] Create help docs

### Launch Day

- [ ] Post on Product Hunt
- [ ] Post on Hacker News (Show HN)
- [ ] Share on Twitter/LinkedIn
- [ ] Email warm leads list
- [ ] Post in relevant Slack communities
- [ ] Reddit (r/SaaS, r/productivity)

### Post-Launch (First Week)

- [ ] Monitor errors daily
- [ ] Respond to all feedback < 24h
- [ ] Track key metrics:
  - Sign-ups
  - Activations (first meeting processed)
  - Conversions (free → paid)
- [ ] Fix critical bugs immediately
- [ ] Send welcome email sequence

---

## Scaling Checklist (When You Hit 100+ Users)

### Infrastructure

- [ ] Upgrade Supabase plan
- [ ] Add Redis for caching/rate limiting
- [ ] Set up CDN (Cloudflare)
- [ ] Add database read replicas
- [ ] Queue system for AI processing (BullMQ/Inngest)

### Monitoring

- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Alert on slow API responses (> 2s)
- [ ] Track AI costs daily
- [ ] Monitor Stripe churn rate

### Team

- [ ] Hire support person
- [ ] Create runbook for common issues
- [ ] Set up on-call rotation

---

## Emergency Procedures

### Site Down

```bash
# Check Vercel status
vercel logs --follow

# Roll back if needed
vercel rollback
```

### Webhook Failures

```bash
# Check webhook logs in provider dashboard
# Manually retry failed webhooks
# Fix issue, redeploy
```

### Database Issues

```bash
# Check Supabase dashboard → Database → Performance
# Scale up if needed
# Check for long-running queries
```

### High Costs (OpenAI)

```bash
# Add spending limits in OpenAI dashboard
# Implement stricter rate limiting
# Cache common responses
```

---

## Success Metrics (First 90 Days)

### Week 1
- [ ] 50+ sign-ups
- [ ] 10+ activated users (processed meeting)
- [ ] 0 critical bugs
- [ ] < 5% churn

### Week 4
- [ ] 200+ sign-ups
- [ ] 50+ activated users
- [ ] 5+ paying customers
- [ ] 1-2 testimonials

### Week 12
- [ ] 1,000+ sign-ups
- [ ] 200+ activated users
- [ ] 50+ paying customers
- [ ] $1,000+ MRR
- [ ] 4.5+ star rating

---

## Contact

Questions? Email: devops@meetingactions.com

Good luck with your launch! 🚀

