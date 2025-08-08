# Webflow Integration Guide

## 🎯 Your Vercel Domain
**Domain:** `https://stevensirby-noble.vercel.app`

## 📍 Where to Put It in Webflow

### 1. **Go to Your Webflow Site**
1. Log into [Webflow.com](https://webflow.com)
2. Open your project
3. Go to **"Pages"** → **"Credit Purchase Page"** (or whatever you named it)

### 2. **Add Custom Code**
1. **Click on the page** you want to edit
2. **Click the gear icon** (⚙️) in the top-right corner
3. **Select "Page Settings"**
4. **Go to "Custom Code" tab**
5. **Add this JavaScript** in the "Head Code" section:

```javascript
<script>
// Replace with your actual Vercel domain
const API_BASE = 'https://stevensirby-noble.vercel.app/api';

// OAuth connection function
function connectToSalesforce() {
    const customerEmail = 'user@example.com'; // Replace with actual email
    
    fetch(`${API_BASE}/oauth/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_email: customerEmail })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.oauth_url;
        } else {
            alert('Failed to connect to Salesforce: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to connect to Salesforce');
    });
}

// Credit pack selection function
function selectPack(packType, price, credits) {
    const customerEmail = 'user@example.com'; // Replace with actual email
    
    fetch(`${API_BASE}/checkout/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: packType,
            price: price,
            credits: credits,
            customer_email: customerEmail
        })
    })
    .then(response => response.json())
    .then(session => {
        if (session.id) {
            // Redirect to Stripe Checkout
            window.location.href = session.url;
        } else {
            alert('Failed to create checkout session: ' + session.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to create checkout session');
    });
}

// Load Stripe
let stripe;
document.addEventListener('DOMContentLoaded', function() {
    // Load Stripe.js
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = function() {
        stripe = Stripe('pk_test_your_stripe_publishable_key'); // Replace with your Stripe publishable key
    };
    document.head.appendChild(script);
});
</script>
```

### 3. **Update Your Buttons**
1. **For "Connect to Salesforce" button:**
   - Select the button
   - In the **"Element Settings"** panel
   - **Click "Add interaction"**
   - **Select "Click"**
   - **Choose "Run custom code"**
   - **Enter:** `connectToSalesforce()`

2. **For Credit Pack buttons:**
   - Select each credit pack button
   - **Click "Add interaction"**
   - **Select "Click"**
   - **Choose "Run custom code"**
   - **Enter:** `selectPack('Starter', 29.99, 100)` (adjust for each pack)

### 4. **Replace Placeholder Values**
In the JavaScript code above, replace:
- `'user@example.com'` with actual customer email (or make it dynamic)
- `'pk_test_your_stripe_publishable_key'` with your actual Stripe publishable key

## 🎯 Example Button Interactions

### Connect Button:
```javascript
connectToSalesforce()
```

### Credit Pack Buttons:
```javascript
// Starter Pack
selectPack('Starter', 29.99, 100)

// Professional Pack  
selectPack('Professional', 79.99, 500)

// Enterprise Pack
selectPack('Enterprise', 149.99, 1000)

// Unlimited Pack
selectPack('Unlimited', 299.99, 9999)
```

## 🧪 Testing

1. **Publish your Webflow site**
2. **Visit your credit purchase page**
3. **Test the "Connect to Salesforce" button**
4. **Test selecting a credit pack**

## 📞 Need Help?

If you need help with:
- **Finding the custom code section** in Webflow
- **Setting up button interactions**
- **Getting your Stripe publishable key**

Let me know and I'll walk you through it step by step!
