# Salesforce OAuth & Stripe Integration API

This Vercel API handles OAuth authentication with Salesforce and Stripe payment processing for credit purchases.

## 🚀 Quick Setup

### 1. Deploy to Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com)
2. **Install Vercel CLI** (optional - you can also deploy via GitHub)
3. **Deploy this folder** to Vercel

### 2. Set Environment Variables

In your Vercel dashboard, add these environment variables:

```
SALESFORCE_CLIENT_ID=your_connected_app_consumer_key
SALESFORCE_CLIENT_SECRET=your_connected_app_consumer_secret
SALESFORCE_REDIRECT_URI=https://your-vercel-app.vercel.app/api/oauth/callback
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
WEBHOOK_SECRET=your_webhook_secret_key
WEBFLOW_DOMAIN=https://your-webflow-site.com
SALESFORCE_INSTANCE_URL=https://your-salesforce-instance.salesforce.com
```

### 3. Update Webflow JavaScript

Replace the API URLs in your Webflow page with your Vercel domain:

```javascript
// Replace these URLs with your Vercel domain
const API_BASE = 'https://your-vercel-app.vercel.app/api';

function connectToSalesforce() {
    fetch(`${API_BASE}/oauth/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_email: 'user@example.com' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.oauth_url;
        }
    });
}

function selectPack(packType, price, credits) {
    fetch(`${API_BASE}/checkout/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: packType,
            price: price,
            credits: credits,
            customer_email: 'user@example.com'
        })
    })
    .then(response => response.json())
    .then(session => {
        return stripe.redirectToCheckout({ sessionId: session.id });
    });
}
```

## 📋 API Endpoints

### POST /api/oauth/initiate
Initiates OAuth flow with Salesforce.

**Request:**
```json
{
  "customer_email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "oauth_url": "https://login.salesforce.com/services/oauth2/authorize?..."
}
```

### GET /api/oauth/callback
Handles OAuth callback from Salesforce.

### POST /api/checkout/create
Creates Stripe checkout session.

**Request:**
```json
{
  "type": "Starter",
  "price": 29.99,
  "credits": 100,
  "customer_email": "user@example.com"
}
```

**Response:**
```json
{
  "id": "cs_xxx",
  "url": "https://checkout.stripe.com/xxx"
}
```

### POST /api/webhook
Handles Stripe webhook events and calls Salesforce to add credits.

## 🔧 Configuration

### Salesforce Connected App Setup

1. **Create Connected App** in Salesforce
2. **Set OAuth Scopes:** `api refresh_token`
3. **Set Callback URL:** `https://your-vercel-app.vercel.app/api/oauth/callback`
4. **Get Consumer Key & Secret**

### Stripe Setup

1. **Create Stripe Account**
2. **Get API Keys** (test mode first)
3. **Set up Webhook** pointing to `/api/webhook`
4. **Add webhook secret** to environment variables

### Webflow Setup

1. **Add custom domain**
2. **Add JavaScript code** to credit purchase page
3. **Create success/error pages** for OAuth flow

## 🧪 Testing

### Test Credit Packs

- **Starter:** $29.99 for 100 credits
- **Professional:** $79.99 for 500 credits  
- **Enterprise:** $149.99 for 1000 credits
- **Unlimited:** $299.99 for unlimited credits

### Test Cards

Use Stripe test cards:
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`

## 🔒 Security

- **OAuth state parameter** prevents CSRF attacks
- **Webhook signature verification** ensures Stripe authenticity
- **API key authentication** for Salesforce webhook calls
- **CORS headers** configured for cross-origin requests

## 📞 Support

For issues or questions, check the Vercel function logs in your dashboard.

# Updated Fri Aug  8 15:38:27 PDT 2025
