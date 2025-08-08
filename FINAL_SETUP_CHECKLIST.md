# Final Setup Checklist

## 🎯 Current Status
- ✅ Salesforce Connected App: "Receiptly OAuth App" created
- ✅ Credentials obtained (Consumer Key & Secret)
- ✅ Stripe publishable key obtained
- 🔄 Vercel deployment needs verification

## 📋 Environment Variables to Verify

### In Vercel Dashboard:
1. **Go to:** [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select:** `salesforce-oauth-api` project
3. **Navigate:** Settings → Environment Variables

### Required Variables:
- [ ] `SALESFORCE_CLIENT_ID` - Your Consumer Key (starts with `3MVG9...`)
- [ ] `SALESFORCE_CLIENT_SECRET` - Your Consumer Secret
- [ ] `SALESFORCE_REDIRECT_URI` - `https://stevensirby-noble.vercel.app/api/oauth/callback`
- [ ] `SALESFORCE_INSTANCE_URL` - `https://irbycompany.my.salesforce.com`
- [ ] `STRIPE_SECRET_KEY` - Your Stripe Secret Key (`sk_test_...`)
- [ ] `WEBHOOK_SECRET` - Your webhook secret (`whsec_...`)
- [ ] `WEBFLOW_DOMAIN` - Your Webflow site domain

## 🔧 Vercel Deployment Check

### 1. Check Deployment Status
1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Check "Deployments" tab**
4. **Look for latest deployment status**

### 2. If Deployment Failed
1. **Check the error logs**
2. **Verify all environment variables are set**
3. **Redeploy if needed**

### 3. If Deployment Succeeded
1. **Copy the deployment URL** (should be `https://stevensirby-noble.vercel.app`)
2. **Test the API endpoints**

## 🧪 Test API Endpoints

### Test 1: OAuth Initiation
```bash
curl -X POST https://stevensirby-noble.vercel.app/api/oauth/initiate \
  -H "Content-Type: application/json" \
  -d '{"customer_email": "test@example.com"}'
```

**Expected Response:**
```json
{
  "success": true,
  "oauth_url": "https://login.salesforce.com/services/oauth2/authorize?..."
}
```

### Test 2: Checkout Creation
```bash
curl -X POST https://stevensirby-noble.vercel.app/api/checkout/create \
  -H "Content-Type: application/json" \
  -d '{
    "type": "Starter",
    "price": 29.99,
    "credits": 100,
    "customer_email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "id": "cs_xxx",
  "url": "https://checkout.stripe.com/xxx"
}
```

## 🔄 Webflow Integration

### Update JavaScript
1. **In your Webflow site:**
   - Go to your credit purchase page
   - Click **gear icon** (⚙️) → **"Page Settings"**
   - Go to **"Custom Code" tab**
   - Update the JavaScript with your actual credentials

### Key Updates Needed:
```javascript
// Update these values:
const API_BASE = 'https://stevensirby-noble.vercel.app/api';
stripe = Stripe('pk_test_YOUR_ACTUAL_KEY_HERE');
```

## 🎯 Next Steps

### If Vercel is Working:
1. **Test OAuth flow** from Webflow
2. **Test credit purchase** flow
3. **Verify webhook processing**
4. **Check credits added** to Salesforce

### If Vercel Needs Fixing:
1. **Check deployment logs**
2. **Verify environment variables**
3. **Redeploy if necessary**
4. **Test endpoints again**

## 📞 Need Help?

**Common Issues:**
1. **"Deployment not found"** - Check Vercel dashboard for deployment status
2. **"Invalid credentials"** - Verify environment variables are set correctly
3. **"OAuth redirect failed"** - Check callback URL matches exactly

**Let me know:**
1. **What's the status of your Vercel deployment?**
2. **Are all environment variables set?**
3. **Do you need help with any specific errors?**

I'm ready to help you get everything working!
