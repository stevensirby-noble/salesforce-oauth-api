# Stripe Webhook Setup Guide

## Step-by-Step Instructions

### 1. Access Stripe Dashboard
1. Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Sign in to your Stripe account
3. Make sure you're in **Test mode** (toggle in the top-right corner)

### 2. Navigate to Webhooks
1. In the left sidebar, click **"Developers"**
2. Click **"Webhooks"** (under "Developers" section)
3. You'll see a page titled "Webhooks" with a list of existing webhooks (if any)

### 3. Add New Endpoint
1. Click the **"Add endpoint"** button (usually a blue button in the top-right)
2. If you don't see "Add endpoint", look for a **"+"** button or **"New endpoint"** button

### 4. Configure the Webhook
1. **Endpoint URL:** Enter your Vercel webhook URL
   ```
   https://your-vercel-domain.vercel.app/api/webhook
   ```
   (Replace `your-vercel-domain` with your actual Vercel domain)

2. **Events to send:** Click "Select events" and choose:
   - ✅ `checkout.session.completed`

3. **Click "Add endpoint"**

### 5. Get the Signing Secret
1. After creating the endpoint, click on it in the webhooks list
2. Scroll down to **"Signing secret"** section
3. Click **"Reveal"** to see the secret
4. **Copy this secret** - it should start with `whsec_`

### 6. Update Vercel Environment Variables
1. Go to your Vercel dashboard
2. Select your `salesforce-oauth-api` project
3. Go to **"Settings"** → **"Environment Variables"**
4. Add/update the `WEBHOOK_SECRET` variable with the secret from step 5

## Troubleshooting

### Can't find "Add endpoint"?
- Make sure you're in the **"Developers"** → **"Webhooks"** section
- Look for buttons like:
  - "Add endpoint"
  - "New endpoint" 
  - "+" (plus icon)
  - "Create endpoint"

### Webhook not working?
- Check that your Vercel domain is correct
- Verify the `WEBHOOK_SECRET` is set in Vercel
- Test with Stripe's webhook testing tool in the dashboard

## Test the Webhook

1. In Stripe Dashboard, go to your webhook endpoint
2. Click **"Send test webhook"**
3. Select `checkout.session.completed`
4. Click **"Send test webhook"**
5. Check your Vercel function logs for the webhook processing
