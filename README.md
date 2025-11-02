# MeetingActions

**Turn meeting talk into shipped tasks—automatically.**

Every meeting → Clear actions → Posted to Slack → In your task tool.

## 🚀 Features

- **AI Action Extraction**: GPT-4 automatically identifies tasks, decisions, and owners from meeting transcripts
- **Multi-Platform Integration**: Zoom, Slack, Linear, Asana, Jira
- **Real-Time Processing**: Summaries and tasks created within 2 minutes of meeting end
- **Beautiful Dashboard**: Track meetings, actions, and team performance
- **Flexible Billing**: Free tier + Pro ($19/mo) + Team ($99/mo)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Auth**: Clerk (Google, Microsoft, Slack OAuth)
- **AI**: OpenAI GPT-4 Turbo
- **Payments**: Stripe
- **Hosting**: Vercel

## 📦 Setup

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Clerk account
- OpenAI API key
- Stripe account (for payments)
- Zoom/Slack/Linear accounts (for integrations)

### 1. Clone & Install

```bash
cd meeting-actions
npm install
```

### 2. Environment Variables

Create `.env.local` in the root directory:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic (optional)
ANTHROPIC_API_KEY=sk-ant-...

# Zoom
ZOOM_WEBHOOK_SECRET_TOKEN=your-secret
ZOOM_CLIENT_ID=your-client-id
ZOOM_CLIENT_SECRET=your-client-secret

# Slack
SLACK_CLIENT_ID=your-client-id
SLACK_CLIENT_SECRET=your-client-secret
SLACK_SIGNING_SECRET=your-signing-secret

# Linear
LINEAR_CLIENT_ID=your-client-id
LINEAR_CLIENT_SECRET=your-client-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRO=price_...
STRIPE_PRICE_ID_TEAM=price_...
```

### 3. Database Setup

Run the SQL schema in Supabase:

```bash
# Copy contents of lib/supabase/schema.sql
# Paste into Supabase SQL Editor
# Run the query
```

### 4. Clerk Setup

1. Create app at [clerk.com](https://clerk.com)
2. Enable Google, Microsoft OAuth providers
3. Copy API keys to `.env.local`
4. Set redirect URLs:
   - Sign-in: `http://localhost:3000/sign-in`
   - Sign-up: `http://localhost:3000/sign-up`
   - After sign-in: `http://localhost:3000/dashboard`

### 5. Zoom Setup

1. Create app at [Zoom Marketplace](https://marketplace.zoom.us)
2. Enable webhooks for:
   - `recording.completed`
   - `meeting.ended`
3. Set webhook URL: `https://your-domain.com/api/webhooks/zoom`
4. Copy client ID, secret, webhook token to `.env.local`

### 6. Slack Setup

1. Create app at [Slack API](https://api.slack.com/apps)
2. Add OAuth scopes: `chat:write`, `channels:read`, `groups:read`
3. Set redirect URL: `http://localhost:3000/api/integrations/slack/callback`
4. Copy client ID, secret, signing secret to `.env.local`

### 7. Linear Setup

1. Go to [Linear Apps](https://linear.app/settings/api)
2. Create OAuth application
3. Set redirect URL: `http://localhost:3000/api/integrations/linear/callback`
4. Scopes: `read`, `write`
5. Copy client ID and secret to `.env.local`

### 8. Stripe Setup

1. Create account at [Stripe](https://stripe.com)
2. Create products:
   - **Pro**: $19/month
   - **Team**: $99/month
3. Copy price IDs to `.env.local`
4. Set webhook URL: `https://your-domain.com/api/webhooks/stripe`
5. Listen for events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

### 9. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Update webhook URLs to production domain
```

### Environment Variables (Production)

Update these in Vercel:
- `NEXT_PUBLIC_APP_URL` → Your production domain
- All webhook URLs → Point to production domain
- Use production keys for Stripe, Zoom, etc.

## 📖 API Documentation

### Webhooks

#### Zoom: `/api/webhooks/zoom`
Receives meeting recordings and transcripts. Triggered by Zoom after meeting ends.

#### Stripe: `/api/webhooks/stripe`
Handles subscription events (created, updated, canceled).

### Integrations

#### Slack OAuth: `/api/integrations/slack`
Start: `GET /api/integrations/slack?workspace_id={id}`  
Callback: `GET /api/integrations/slack/callback`

#### Linear OAuth: `/api/integrations/linear`
Start: `GET /api/integrations/linear?workspace_id={id}`  
Callback: `GET /api/integrations/linear/callback`

## 🏗️ Architecture

```
meeting-actions/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/
│   │   ├── page.tsx          # Main dashboard
│   │   ├── integrations/     # Connect tools
│   │   ├── meetings/          # Meeting history
│   │   └── actions/           # Action items
│   ├── api/
│   │   ├── webhooks/
│   │   │   ├── zoom/          # Zoom webhook
│   │   │   └── stripe/        # Stripe webhook
│   │   └── integrations/
│   │       ├── slack/         # Slack OAuth
│   │       └── linear/        # Linear OAuth
│   └── page.tsx              # Landing page
├── lib/
│   ├── supabase/
│   │   ├── schema.sql        # Database schema
│   │   └── client.ts         # Supabase client
│   ├── openai.ts             # AI extraction
│   ├── stripe.ts             # Billing
│   ├── types.ts              # TypeScript types
│   └── config.ts             # App config
└── components/
    └── ui/                   # Shadcn components
```

## 💡 Usage

### For End Users

1. **Connect Zoom**: Authorize MeetingActions to receive meeting transcripts
2. **Connect Slack**: Choose channels for meeting summaries
3. **Connect Linear** (optional): Auto-create tasks from action items
4. **Have meetings**: MeetingActions processes automatically
5. **Review actions**: Check dashboard for extracted items
6. **Update status**: Mark actions as complete

### For Developers

#### Process a Meeting Manually

```typescript
import { extractActions, generateSummary } from '@/lib/openai';

const actions = await extractActions(transcript, meetingTitle);
const summary = await generateSummary(transcript, meetingTitle);
```

#### Post to Slack

```typescript
const response = await fetch('/api/integrations/slack', {
  method: 'POST',
  body: JSON.stringify({
    workspace_id: 'xxx',
    channel_id: 'C12345',
    text: 'Meeting summary...',
  }),
});
```

## 🎯 Roadmap

- [x] Zoom integration
- [x] Slack integration
- [x] Linear integration
- [ ] Google Meet integration
- [ ] Asana integration
- [ ] Jira integration
- [ ] Microsoft Teams integration
- [ ] Custom action types
- [ ] AI-powered meeting insights
- [ ] Recurring meeting patterns
- [ ] Export to PDF/CSV

## 📄 License

MIT License - Build whatever you want!

## 🤝 Contributing

PRs welcome! Please open an issue first to discuss changes.

## 💬 Support

- **Email**: support@meetingactions.com
- **Docs**: [docs.meetingactions.com](https://docs.meetingactions.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/meeting-actions/issues)

---

Built with ❤️ by developers who hate losing track of follow-ups.
