const express = require('express');
const axios = require('axios');
const cors = require('cors'); // ✅ Import CORS

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for all origins
app.use(cors({
  origin: "*", // Allows all origins
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization"
}));

const apiKey = '3588cced-e0c3-47da-a643-c4a43819662b'; // Replace with your actual API key

// ✅ Route to fetch USDT to EUR conversion rate
app.get('/get-usdt-to-eur', async (req, res) => {
  try {
    const response = await axios.get(
      'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=USDT&convert=EUR',
      { headers: { 'X-CMC_PRO_API_KEY': apiKey } }
    );

    res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ Ensure CORS headers are set
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    res.status(500).send('Error fetching conversion rate');
  }
});

// ✅ Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
