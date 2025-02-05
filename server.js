const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = '3588cced-e0c3-47da-a643-c4a43819662b';  // Replace with your actual CoinMarketCap API key

// ✅ Use CORS middleware globally
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Explicitly set CORS headers for preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});

// ✅ Route to fetch USDT to EUR conversion rate
app.get('/get-usdt-to-eur', async (req, res) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDT&convert=EUR',
      { headers: { 'X-CMC_PRO_API_KEY': apiKey } }
    );

    // ✅ Ensure CORS headers are added to response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    res.status(500).json({ error: 'Error fetching conversion rate' });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
