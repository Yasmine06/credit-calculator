const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 5000;
ss
const apiKey = '3588cced-e0c3-47da-a643-c4a43819662b'; // Replace with your actual API key

// ✅ Enable CORS with explicit headers
app.use(cors());

// ✅ Middleware to set headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// ✅ Route to fetch USDT to EUR conversion rate
app.get('/get-usdt-to-eur', async (req, res) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDT&convert=EUR',
      { headers: { 'X-CMC_PRO_API_KEY': apiKey } }
    );

    // ✅ Explicitly set CORS headers for this response
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    res.status(500).json({ error: 'Error fetching conversion rate' });
  }
});

// ✅ Handle OPTIONS requests for CORS preflight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.send();
});

// ✅ Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
