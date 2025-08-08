# Get Stripe Publishable Key

## 🎯 Overview
You need your Stripe publishable key to complete the Webflow integration.

## 📋 Step-by-Step Instructions

### 1. Access Stripe Dashboard

1. **Go to Stripe Dashboard:**
   - Visit [dashboard.stripe.com](https://dashboard.stripe.com)
   - Sign in to your account
   - **Make sure you're in Test mode** (toggle in top-right corner)

### 2. Navigate to API Keys

1. **In the left sidebar:**
   - Click **"Developers"**
   - Click **"API Keys"**

### 3. Copy Your Keys

1. **Publishable Key (for frontend):**
   - **Copy the "Publishable key"** (starts with `pk_test_...`)
   - This is what you need for Webflow

2. **Secret Key (for backend):**
   - **Copy the "Secret key"** (starts with `sk_test_...`)
   - This should already be in your Vercel environment variables

## 🔧 Update Webflow JavaScript

### 1. In Your Webflow Site:
1. **Go to your credit purchase page**
2. **Click the gear icon** (⚙️) → **"Page Settings"**
3. **Go to "Custom Code" tab**
4. **Find this line in your JavaScript:**

```javascript
stripe = Stripe('pk_test_your_stripe_publishable_key'); // Replace with your Stripe publishable key
```

### 2. Replace with Your Actual Key:
```javascript
stripe = Stripe('pk_test_51ABC123...'); // Your actual publishable key
```

## 🧪 Test the Integration

### Test Credit Pack Selection:
1. **Visit your Webflow credit purchase page**
2. **Click "Connect to Salesforce"** (should redirect to Salesforce)
3. **Select a credit pack** (should open Stripe checkout)
4. **Use test card:** `4242 4242 4242 4242`

## 🎯 Current Status

### ✅ Ready:
- [ ] Vercel API deployed
- [ ] Stripe webhook configured
- [ ] Environment variables set up (need Salesforce credentials)

### 🔄 In Progress:
- [ ] Salesforce Connected App credentials
- [ ] Stripe publishable key for Webflow

### 📋 Next Steps:
1. **Get Salesforce Consumer Key and Secret**
2. **Get Stripe publishable key**
3. **Update Vercel environment variables**
4. **Update Webflow JavaScript**
5. **Test complete flow**

## 📞 Need Help?

If you encounter issues:
1. **Check that you're in Test mode** in Stripe
2. **Verify the key starts with `pk_test_...`**
3. **Make sure the key is copied correctly** (no extra spaces)

Let me know when you have both the Salesforce credentials and Stripe publishable key!
