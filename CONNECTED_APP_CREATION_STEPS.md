# Connected App Creation - Manual Steps

## 🎯 Current Status
- ✅ Salesforce org open: `https://irbycompany.my.salesforce.com`
- ✅ User: `csirby.co@gmail.com`
- 🔄 Need to create Connected App manually

## 📋 Step-by-Step Instructions

### 1. Navigate to Connected Apps

1. **In your Salesforce org:**
   - Click the **gear icon** (⚙️) in the top-right corner
   - Click **"Setup"**

2. **Search for Connected Apps:**
   - In the left sidebar, type **"Connected Apps"** in the search box
   - Click **"Connected Apps"** under "App Manager"

### 2. Create New Connected App

1. **Click "New":**
   - On the Connected Apps page, click the **"New"** button

2. **Fill in Basic Information:**
   - **Connected App Name:** `Credit System OAuth`
   - **API Name:** `Credit_System_OAuth` (auto-generated)
   - **Contact Email:** `csirby.co@gmail.com`
   - **Logo Image:** (leave blank for now)
   - **Icon:** (leave blank for now)
   - **Info URL:** (leave blank)
   - **Privacy Policy URL:** (leave blank)
   - **Terms of Service URL:** (leave blank)

3. **Click "Save"**

### 3. Configure OAuth Settings

1. **In your new Connected App:**
   - Scroll down to **"OAuth Policies"** section
   - Click **"Edit"**

2. **Set OAuth Policies:**
   - **Callback URL:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - **Selected OAuth Scopes:**
     - ✅ **"Access and manage your data (api)"**
     - ✅ **"Perform requests at any time (refresh_token, offline_access)"**
   - **IP Restrictions:** (leave blank)
   - Click **"Save"**

3. **Enable OAuth Settings:**
   - Scroll down to **"OAuth Settings"** section
   - Click **"Edit"**
   - **Enable OAuth Settings:** ✅ Check this box
   - **Callback URL:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - **Selected OAuth Scopes:** Same as above
   - Click **"Save"**

### 4. Get Your Credentials

1. **Consumer Key (Client ID):**
   - In your Connected App, scroll to **"Consumer Details"** section
   - **Copy the "Consumer Key"** (starts with `3MVG9...`)

2. **Consumer Secret (Client Secret):**
   - Click **"Click to Reveal"** next to Consumer Secret
   - **Copy the Consumer Secret**

### 5. Update Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Select your `salesforce-oauth-api` project
   - Go to **"Settings"** → **"Environment Variables"**

2. **Update these variables:**
   - **`SALESFORCE_CLIENT_ID`:** Your Consumer Key
   - **`SALESFORCE_CLIENT_SECRET`:** Your Consumer Secret
   - **`SALESFORCE_REDIRECT_URI`:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - **`SALESFORCE_INSTANCE_URL`:** `https://irbycompany.my.salesforce.com`

## 🧪 Test the Connected App

### Test OAuth Initiation
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

## 🔧 Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Make sure the callback URL matches exactly: `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - No extra spaces or characters

2. **"Invalid client_id"**
   - Verify the Consumer Key is copied correctly
   - Check that the Connected App is active

3. **"Invalid scope"**
   - Make sure both `api` and `refresh_token` scopes are selected

## 🎯 Next Steps

After creating the Connected App:
1. **Copy the Consumer Key and Secret**
2. **Update Vercel environment variables**
3. **Test the OAuth flow**
4. **Get your Stripe publishable key**

## 📞 Need Help?

If you encounter issues:
1. **Check the exact callback URL** matches your Vercel domain
2. **Verify OAuth scopes** are set correctly
3. **Test with the curl command** above
4. **Check Vercel function logs** for errors

Let me know when you've created the Connected App and I'll help you test it!
