const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        // Extract metadata
        const {
          pack_type,
          credits,
          customer_email,
          price
        } = session.metadata;

        // Call Salesforce webhook to add credits
        await callSalesforceWebhook({
          action: 'add_credits',
          customer_email,
          pack_type,
          credits: parseInt(credits),
          price: parseFloat(price),
          transaction_id: session.id
        });

        console.log('Payment completed and credits added:', {
          customer_email,
          pack_type,
          credits,
          price
        });
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error.message 
    });
  }
};

async function callSalesforceWebhook(data) {
  try {
    const salesforceWebhookUrl = `${process.env.SALESFORCE_INSTANCE_URL}/services/apexrest/credits/webhook`;
    
    const response = await axios.post(salesforceWebhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.WEBHOOK_SECRET
      }
    });

    console.log('Salesforce webhook response:', response.status);
    return response.data;

  } catch (error) {
    console.error('Failed to call Salesforce webhook:', error.message);
    throw error;
  }
}

