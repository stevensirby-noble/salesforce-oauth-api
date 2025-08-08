# Salesforce Connected App Setup Guide

## 🎯 Overview
You need to create a Connected App in Salesforce to enable OAuth integration with your Vercel API.

## 📋 Prerequisites
- Access to your Salesforce org (csirby.co@gmail.com)
- Admin permissions

## 🚀 Step-by-Step Setup

### 1. Create Connected App

1. **Go to Salesforce Setup:**
   - Log into your Salesforce org
   - Click the **gear icon** (⚙️) → **"Setup"**

2. **Navigate to Connected Apps:**
   - In the left sidebar, search for **"Connected Apps"**
   - Click **"Connected Apps"**

3. **Create New Connected App:**
   - Click **"New"**
   - Fill in the details:
     - **Connected App Name:** `Credit System OAuth`
     - **API Name:** `Credit_System_OAuth`
     - **Contact Email:** `csirby.co@gmail.com`
     - **Logo Image:** (optional)
     - **Icon:** (optional)
   - Click **"Save"**

### 2. Configure OAuth Settings

1. **In your new Connected App:**
   - Scroll down to **"OAuth Policies"** section
   - Click **"Edit"**

2. **Set OAuth Policies:**
   - **Callback URL:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - **Selected OAuth Scopes:**
     - ✅ **"Access and manage your data (api)"**
     - ✅ **"Perform requests at any time (refresh_token, offline_access)"**
   - **IP Restrictions:** (leave blank for now)
   - Click **"Save"**

3. **Enable OAuth Settings:**
   - Scroll down to **"OAuth Settings"** section
   - Click **"Edit"**
   - **Enable OAuth Settings:** ✅ Check this box
   - **Callback URL:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - **Selected OAuth Scopes:** Same as above
   - Click **"Save"**

### 3. Get Your Credentials

1. **Consumer Key (Client ID):**
   - In your Connected App, scroll to **"Consumer Details"** section
   - **Copy the "Consumer Key"** (starts with `3MVG9...`)

2. **Consumer Secret (Client Secret):**
   - Click **"Click to Reveal"** next to Consumer Secret
   - **Copy the Consumer Secret**

### 4. Update Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Select your `salesforce-oauth-api` project
   - Go to **"Settings"** → **"Environment Variables"**

2. **Update these variables:**
   - **`SALESFORCE_CLIENT_ID`:** Your Consumer Key
   - **`SALESFORCE_CLIENT_SECRET`:** Your Consumer Secret
   - **`SALESFORCE_REDIRECT_URI`:** `https://stevensirby-noble.vercel.app/api/oauth/callback`

### 5. Test the OAuth Flow

1. **Test URL:** `https://stevensirby-noble.vercel.app/api/oauth/initiate`
2. **Method:** POST
3. **Body:** `{"customer_email": "test@example.com"}`

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Make sure the callback URL in Connected App matches exactly
   - Check for extra spaces or characters

2. **"Invalid client_id"**
   - Verify the Consumer Key is copied correctly
   - Check that the Connected App is active

3. **"Invalid scope"**
   - Make sure both `api` and `refresh_token` scopes are selected

### Testing Steps:

1. **Test OAuth Initiation:**
   ```bash
   curl -X POST https://stevensirby-noble.vercel.app/api/oauth/initiate \
     -H "Content-Type: application/json" \
     -d '{"customer_email": "test@example.com"}'
   ```

2. **Check Response:**
   - Should return: `{"success": true, "oauth_url": "https://login.salesforce.com/..."}`

## 🎯 Next Steps

After setting up the Connected App:
1. **Update Vercel environment variables** with your credentials
2. **Test the OAuth flow** from your Webflow site
3. **Verify webhook integration** works end-to-end

## 📞 Need Help?

If you encounter issues:
1. **Check Salesforce Setup** → **"Connected Apps"** → **"Manage"**
2. **Verify OAuth settings** are enabled
3. **Test with Postman** or curl commands
4. **Check Vercel function logs** for errors

Let me know when you've created the Connected App and I'll help you test it!
