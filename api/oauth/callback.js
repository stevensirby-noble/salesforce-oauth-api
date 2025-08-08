const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Decode state parameter
    let stateData;
    try {
      const stateBuffer = Buffer.from(state, 'base64');
      stateData = JSON.parse(stateBuffer.toString());
    } catch (error) {
      return res.status(400).json({ error: 'Invalid state parameter' });
    }

    const { customer_email } = stateData;

    // Exchange code for access token
    const tokenResponse = await axios.post('https://login.salesforce.com/services/oauth2/token', {
      grant_type: 'authorization_code',
      code: code,
      client_id: process.env.SALESFORCE_CLIENT_ID,
      client_secret: process.env.SALESFORCE_CLIENT_SECRET,
      redirect_uri: process.env.SALESFORCE_REDIRECT_URI
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const {
      access_token,
      refresh_token,
      instance_url,
      expires_in
    } = tokenResponse.data;

    // Store OAuth connection (in production, use a database)
    // For now, we'll just return success
    const oauthData = {
      customer_email,
      access_token,
      refresh_token,
      instance_url,
      expires_in,
      created_at: new Date().toISOString()
    };

    // In production, store this in a database
    console.log('OAuth connection established:', oauthData);

    // Redirect to success page
    const successUrl = `${process.env.WEBFLOW_DOMAIN}/oauth-success?email=${encodeURIComponent(customer_email)}`;
    
    res.writeHead(302, {
      'Location': successUrl
    });
    res.end();

  } catch (error) {
    console.error('OAuth callback error:', error);
    
    // Redirect to error page
    const errorUrl = `${process.env.WEBFLOW_DOMAIN}/oauth-error?error=${encodeURIComponent(error.message)}`;
    
    res.writeHead(302, {
      'Location': errorUrl
    });
    res.end();
  }
};
