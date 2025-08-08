# Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SALESFORCE_CLIENT_ID` | Your Salesforce Connected App Consumer Key | `3MVG9...` |
| `SALESFORCE_CLIENT_SECRET` | Your Salesforce Connected App Consumer Secret | `1234567890...` |
| `SALESFORCE_REDIRECT_URI` | OAuth callback URL (your Vercel domain) | `https://your-app.vercel.app/api/oauth/callback` |
| `STRIPE_SECRET_KEY` | Your Stripe Secret Key (test mode first) | `sk_test_...` |
| `WEBHOOK_SECRET` | Secret key for webhook verification | `whsec_...` |
| `WEBFLOW_DOMAIN` | Your Webflow site domain | `https://your-site.webflow.io` |
| `SALESFORCE_INSTANCE_URL` | Your Salesforce instance URL | `https://your-org.salesforce.com` |

## How to Set Them

1. Go to your Vercel dashboard
2. Select your `salesforce-oauth-api` project
3. Go to "Settings" → "Environment Variables"
4. Add each variable above
5. Click "Save"

## Testing

After setting the variables, your API endpoints will be available at:
- `https://your-app.vercel.app/api/oauth/initiate`
- `https://your-app.vercel.app/api/oauth/callback`
- `https://your-app.vercel.app/api/checkout/create`
- `https://your-app.vercel.app/api/webhook`
