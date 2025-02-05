const express = require('express');
const axios = require('axios');
const cors = require('cors');  // Import CORS

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for all origins
app.use(cors());

const apiKey = '3588cced-e0c3-47da-a643-c4a43819662b';  // Replace with your actual CoinMarketCap API key

// Route to fetch USDT to EUR conversion rate
app.get('/get-usdt-to-eur', async (req, res) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDT&convert=EUR',
      { headers: { 'X-CMC_PRO_API_KEY': apiKey } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching conversion rate');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
