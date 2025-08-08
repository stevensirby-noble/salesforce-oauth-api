# Next Steps After Stripe Webhook Setup

## ✅ Completed
- [x] Created GitHub repository
- [x] Pushed code to GitHub
- [x] Set up Stripe webhook endpoint
- [x] Selected "Events on your account"
- [x] Selected `checkout.session.completed` event

## 🔄 Next Steps

### 1. Get Your Webhook Signing Secret
1. In Stripe Dashboard, go to your webhook endpoint
2. Scroll down to **"Signing secret"** section
3. Click **"Reveal"** to see the secret
4. **Copy the secret** (it starts with `whsec_`)

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Import `salesforce-oauth-api` repository
5. Click **"Deploy"**

### 3. Set Environment Variables in Vercel
Once deployed, add these environment variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `SALESFORCE_CLIENT_ID` | Your Connected App Consumer Key | From Salesforce |
| `SALESFORCE_CLIENT_SECRET` | Your Connected App Consumer Secret | From Salesforce |
| `SALESFORCE_REDIRECT_URI` | `https://your-domain.vercel.app/api/oauth/callback` | Replace with your Vercel domain |
| `STRIPE_SECRET_KEY` | `sk_test_...` | From Stripe Dashboard |
| `WEBHOOK_SECRET` | `whsec_...` | The secret you just copied |
| `WEBFLOW_DOMAIN` | `https://your-site.webflow.io` | Your Webflow domain |
| `SALESFORCE_INSTANCE_URL` | `https://your-org.salesforce.com` | Your Salesforce instance |

### 4. Test the Webhook
1. In Stripe Dashboard, go to your webhook
2. Click **"Send test webhook"**
3. Select `checkout.session.completed`
4. Click **"Send test webhook"**
5. Check Vercel logs for success

### 5. Update Webflow
1. Get your Vercel domain (e.g., `https://salesforce-oauth-api-abc123.vercel.app`)
2. Update JavaScript in Webflow to use your Vercel API endpoints
3. Test the complete OAuth and checkout flow

## 🎯 Current Status
- **GitHub:** ✅ Ready
- **Stripe Webhook:** ✅ Ready  
- **Vercel:** 🔄 Need to deploy
- **Environment Variables:** 🔄 Need to configure
- **Webflow Integration:** 🔄 Need to update

Let me know when you've deployed to Vercel and I'll help you with the environment variables!
