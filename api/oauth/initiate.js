const axios = require('axios');
const crypto = require('crypto');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customer_email } = req.body;

    if (!customer_email) {
      return res.status(400).json({ error: 'Customer email is required' });
    }

    // Generate state parameter for security
    const state = crypto.randomBytes(32).toString('hex');
    
    // Store state temporarily (in production, use a database)
    // For now, we'll use a simple approach
    const stateData = {
      customer_email,
      timestamp: Date.now()
    };

    // Build OAuth URL
    const clientId = process.env.SALESFORCE_CLIENT_ID;
    const redirectUri = process.env.SALESFORCE_REDIRECT_URI;
    
    const oauthUrl = `https://login.salesforce.com/services/oauth2/authorize?` +
      `response_type=code&` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent('api refresh_token')}&` +
      `state=${state}`;

    // Store state data (in production, use Redis or database)
    // For demo purposes, we'll pass it in the redirect URI
    const stateParam = Buffer.from(JSON.stringify(stateData)).toString('base64');
    const finalOauthUrl = oauthUrl + `&state=${stateParam}`;

    res.status(200).json({
      success: true,
      oauth_url: finalOauthUrl
    });

  } catch (error) {
    console.error('OAuth initiation error:', error);
    res.status(500).json({ 
      error: 'Failed to initiate OAuth',
      details: error.message 
    });
  }
};
