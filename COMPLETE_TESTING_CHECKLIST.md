# Complete Testing Checklist

## 🎯 Pre-Testing Setup

### ✅ Environment Variables (Vercel)
- [ ] `SALESFORCE_CLIENT_ID` - Connected App Consumer Key
- [ ] `SALESFORCE_CLIENT_SECRET` - Connected App Consumer Secret
- [ ] `SALESFORCE_REDIRECT_URI` - `https://stevensirby-noble.vercel.app/api/oauth/callback`
- [ ] `STRIPE_SECRET_KEY` - Stripe Secret Key (`sk_test_...`)
- [ ] `WEBHOOK_SECRET` - Stripe webhook secret (`whsec_...`)
- [ ] `WEBFLOW_DOMAIN` - Your Webflow site domain
- [ ] `SALESFORCE_INSTANCE_URL` - Your Salesforce instance URL

### ✅ Salesforce Setup
- [ ] Connected App created with OAuth enabled
- [ ] OAuth scopes: `api` and `refresh_token`
- [ ] Callback URL: `https://stevensirby-noble.vercel.app/api/oauth/callback`
- [ ] Custom objects deployed (`Credit_Balance__c`, `Credit_Purchase__c`, etc.)
- [ ] Apex classes deployed (`CreditWebhookHandler`, `OAuthIntegrationController`)

### ✅ Stripe Setup
- [ ] Webhook endpoint: `https://stevensirby-noble.vercel.app/api/webhook`
- [ ] Webhook events: `checkout.session.completed`
- [ ] Test mode enabled
- [ ] Publishable key ready for Webflow

### ✅ Webflow Setup
- [ ] Custom JavaScript added to credit purchase page
- [ ] API_BASE updated: `https://stevensirby-noble.vercel.app/api`
- [ ] Stripe publishable key updated
- [ ] Button interactions configured
- [ ] Site published with SSL

## 🧪 Testing Sequence

### 1. **API Endpoint Testing**

#### Test OAuth Initiation
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

#### Test Checkout Creation
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

### 2. **Webhook Testing**

#### Test Stripe Webhook
1. **In Stripe Dashboard:**
   - Go to **Developers** → **Webhooks**
   - Click on your webhook endpoint
   - Click **"Send test webhook"**
   - Select `checkout.session.completed`
   - Click **"Send test webhook"**

2. **Check Vercel Logs:**
   - Go to Vercel Dashboard → **Functions** → **`/api/webhook`**
   - Look for: "Payment completed and credits added"

### 3. **End-to-End Testing**

#### Test Complete Flow
1. **Visit Webflow Site:**
   - Go to your credit purchase page
   - Verify page loads without errors

2. **Test OAuth Connection:**
   - Click **"Connect to Salesforce"**
   - Should redirect to Salesforce login
   - Complete login
   - Should redirect back to Webflow

3. **Test Credit Purchase:**
   - Select a credit pack (e.g., Starter - $29.99)
   - Should open Stripe checkout
   - Use test card: `4242 4242 4242 4242`
   - Complete payment

4. **Verify Credits Added:**
   - Check Salesforce org for new `Credit_Purchase__c` record
   - Verify `Credit_Balance__c` is updated
   - Check Vercel logs for webhook processing

## 🔍 Troubleshooting Guide

### Common Issues & Solutions

#### 1. **OAuth Issues**
- **"Invalid redirect URI"**
  - Check Connected App callback URL matches exactly
  - No extra spaces or characters

- **"Invalid client_id"**
  - Verify Consumer Key is copied correctly
  - Check Connected App is active

#### 2. **Stripe Issues**
- **"Invalid publishable key"**
  - Use test key starting with `pk_test_...`
  - Check key is copied correctly

- **"Checkout session not found"**
  - Verify Stripe secret key in Vercel
  - Check Vercel function logs

#### 3. **Webhook Issues**
- **"Webhook signature verification failed"**
  - Check webhook secret matches between Stripe and Vercel
  - Verify webhook URL is correct

#### 4. **Salesforce Issues**
- **"Credits not added"**
  - Check `CreditWebhookHandler` is deployed
  - Verify custom objects exist
  - Check Salesforce logs for errors

## 📊 Success Criteria

### ✅ All Tests Pass
- [ ] OAuth flow completes successfully
- [ ] Stripe checkout opens and processes payment
- [ ] Webhook receives and processes events
- [ ] Credits are added to Salesforce org
- [ ] No errors in browser console
- [ ] No errors in Vercel logs
- [ ] No errors in Salesforce logs

### ✅ User Experience
- [ ] Page loads quickly
- [ ] Buttons respond immediately
- [ ] Clear error messages if issues occur
- [ ] Smooth redirects between systems
- [ ] Payment completion is clear

## 🎯 Next Steps After Testing

1. **Document any issues** and their solutions
2. **Update production environment** if needed
3. **Set up monitoring** for webhook failures
4. **Plan for live mode** (real payments)
5. **Create user documentation**

## 📞 Support

If you encounter issues:
1. **Check this checklist** for common solutions
2. **Review Vercel function logs** for errors
3. **Test individual components** before full flow
4. **Use Stripe test cards** for safe testing

Let me know when you're ready to start testing and I'll help you through each step!
