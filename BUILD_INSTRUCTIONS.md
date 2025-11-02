# Build Instructions

## Local Development

1. **Copy environment variables**:
```bash
cp .env.local.example .env.local
# Edit .env.local with your actual keys
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

**Note**: The build requires environment variables to be set. You have two options:

### Option 1: Set Required Env Vars (Recommended for CI/CD)

Set at minimum these variables before building:
```bash
export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
export CLERK_SECRET_KEY="sk_test_..."
export NEXT_PUBLIC_SUPABASE_URL="https://..."
export NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
export SUPABASE_SERVICE_ROLE_KEY="..."
export OPENAI_API_KEY="sk-..."
export STRIPE_SECRET_KEY="sk_..."
export NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
export STRIPE_PRICE_ID_PRO="price_..."
export STRIPE_PRICE_ID_TEAM="price_..."

npm run build
```

### Option 2: Create .env.local (For Local Testing)

```bash
# Create .env.local with all required keys
npm run build
npm start
```

## Deploy to Vercel

Vercel handles environment variables automatically:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect to GitHub and push
git push origin main
```

Set environment variables in Vercel Dashboard → Project → Settings → Environment Variables

## Common Build Issues

### "Missing publishableKey" Error
→ Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in environment

### "STRIPE_SECRET_KEY is not set" Error  
→ Set `STRIPE_SECRET_KEY` in environment

### "Supabase connection failed" Error
→ Set Supabase environment variables

All sensitive keys should NEVER be committed to git. Use environment variables or secrets management.

