# Get Connected App Credentials

## 🎯 Connected App: "Receiptly OAuth App"

### Step 1: Access Your Connected App

1. **In your Salesforce org:**
   - Go to `https://irbycompany.my.salesforce.com`
   - Click the **gear icon** (⚙️) → **"Setup"**
   - In the left sidebar, search for **"Connected Apps"**
   - Click **"Connected Apps"** under "App Manager"

2. **Find your app:**
   - Look for **"Receiptly OAuth App"** in the list
   - Click on it to open the details

### Step 2: Get Your Credentials

1. **Consumer Key (Client ID):**
   - Scroll down to **"Consumer Details"** section
   - **Copy the "Consumer Key"** (starts with `3MVG9...`)
   - This is your `SALESFORCE_CLIENT_ID`

2. **Consumer Secret (Client Secret):**
   - In the same section, click **"Click to Reveal"** next to Consumer Secret
   - **Copy the Consumer Secret**
   - This is your `SALESFORCE_CLIENT_SECRET`

### Step 3: Verify OAuth Settings

1. **Check OAuth Configuration:**
   - Scroll down to **"OAuth Policies"** section
   - **Callback URL should be:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
   - **OAuth Scopes should include:**
     - ✅ `api` (Access and manage your data)
     - ✅ `refresh_token` (Perform requests at any time)

2. **Check OAuth Settings:**
   - Scroll down to **"OAuth Settings"** section
   - **Enable OAuth Settings** should be checked
   - **Callback URL** should match: `https://stevensirby-noble.vercel.app/api/oauth/callback`

### Step 4: Update Vercel Environment Variables

1. **Go to Vercel Dashboard:**
   - Select your `salesforce-oauth-api` project
   - Go to **"Settings"** → **"Environment Variables"**

2. **Update these variables:**
   - **`SALESFORCE_CLIENT_ID`:** Your Consumer Key (starts with `3MVG9...`)
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

### If you can't find the Connected App:
1. **Check the exact name:** "Receiptly OAuth App"
2. **Look in different sections:** Sometimes it appears under "App Manager" or "Connected Apps"
3. **Refresh the page** and search again

### If OAuth settings are missing:
1. **Click "Edit"** on the Connected App
2. **Scroll down to "OAuth Policies"**
3. **Set the callback URL:** `https://stevensirby-noble.vercel.app/api/oauth/callback`
4. **Select OAuth scopes:** `api` and `refresh_token`

## 🎯 Next Steps

After getting the credentials:
1. **Update Vercel environment variables**
2. **Test the OAuth flow**
3. **Get your Stripe publishable key**
4. **Test the complete integration**

Let me know when you have the Consumer Key and Secret, and I'll help you test everything!
