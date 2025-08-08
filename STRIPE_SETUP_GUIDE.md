# Stripe Setup Guide

## 🎯 Overview
You need to get your Stripe publishable key to complete the Webflow integration.

## 📋 Prerequisites
- Stripe account (dashboard.stripe.com)
- Test mode enabled

## 🚀 Step-by-Step Setup

### 1. Get Your Stripe Keys

1. **Go to Stripe Dashboard:**
   - Visit [dashboard.stripe.com](https://dashboard.stripe.com)
   - Sign in to your account
   - **Make sure you're in Test mode** (toggle in top-right)

2. **Navigate to API Keys:**
   - In the left sidebar, click **"Developers"**
   - Click **"API Keys"**

3. **Copy Your Keys:**
   - **Publishable Key:** Starts with `pk_test_...` (for frontend)
   - **Secret Key:** Starts with `sk_test_...` (for backend - already in Vercel)

### 2. Update Webflow JavaScript

1. **In your Webflow site:**
   - Go to your credit purchase page
   - **Click the gear icon** (⚙️) → **"Page Settings"**
   - **Go to "Custom Code" tab**
   - **Find this line in your JavaScript:**

```javascript
stripe = Stripe('pk_test_your_stripe_publishable_key'); // Replace with your Stripe publishable key
```

2. **Replace with your actual key:**
```javascript
stripe = Stripe('pk_test_51ABC123...'); // Your actual publishable key
```

### 3. Test Credit Pack Selection

1. **Test the complete flow:**
   - Visit your Webflow credit purchase page
   - Click **"Connect to Salesforce"**
   - Select a credit pack
   - Complete Stripe checkout with test card: `4242 4242 4242 4242`

2. **Check for success:**
   - OAuth redirects to Salesforce
   - Stripe checkout completes
   - Credits are added to Salesforce org

## 🧪 Testing Checklist

### ✅ Pre-Testing
- [ ] Stripe publishable key updated in Webflow
- [ ] Vercel environment variables configured
- [ ] Salesforce Connected App created
- [ ] Webhook endpoint configured in Stripe

### ✅ Testing Steps
- [ ] **OAuth Flow:** Click "Connect to Salesforce" → Redirects to Salesforce login
- [ ] **Credit Selection:** Click credit pack → Opens Stripe checkout
- [ ] **Payment:** Complete payment with test card
- [ ] **Webhook:** Check Vercel logs for webhook processing
- [ ] **Credits:** Verify credits added to Salesforce org

### ✅ Test Cards
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Expired:** `4000 0000 0000 0069`

## 🔧 Troubleshooting

### Common Issues:

1. **"Stripe is not defined"**
   - Make sure Stripe.js is loaded before using it
   - Check the script loading order

2. **"Invalid publishable key"**
   - Verify the key starts with `pk_test_...`
   - Make sure you're using the test key (not live)

3. **"Checkout session not found"**
   - Check Vercel function logs for errors
   - Verify Stripe secret key in environment variables

4. **"OAuth redirect failed"**
   - Check Connected App callback URL
   - Verify OAuth scopes are set correctly

## 🎯 Next Steps

After getting your Stripe publishable key:
1. **Update Webflow JavaScript** with the key
2. **Test the complete flow** end-to-end
3. **Verify credits are added** to Salesforce
4. **Check webhook processing** in Vercel logs

## 📞 Need Help?

If you encounter issues:
1. **Check browser console** for JavaScript errors
2. **Check Vercel function logs** for API errors
3. **Verify all environment variables** are set correctly
4. **Test with Stripe's test cards** first

Let me know when you've updated the Stripe publishable key and I'll help you test the complete flow!
