const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

// Your CoinMarketCap API key
const apiKey = '3588cced-e0c3-47da-a643-c4a43819662b'; // Replace with your actual CoinMarketCap API key

// Endpoint to fetch USDT to EUR conversion rate
app.get('/get-usdt-to-eur', async (req, res) => {
  try {
    // CoinMarketCap API request to fetch USDT to EUR rate
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDT&convert=EUR', {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey, // API key for CoinMarketCap
      },
    });

    // Sending the response back to the frontend
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching conversion rate');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
