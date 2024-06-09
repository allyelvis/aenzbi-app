const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sales = [];
const stocks = [];

// Sales Endpoint
app.post('/sales', (req, res) => {
  const { authorization } = req.headers;
  if (authorization === 'Bearer YOUR_BEARER_TOKEN') {
    sales.push(req.body);
    res.status(200).send({ message: 'Sale recorded' });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Stock Endpoint
app.post('/stocks', (req, res) => {
  const { authorization } = req.headers;
  if (authorization === 'Bearer YOUR_BEARER_TOKEN') {
    stocks.push(req.body);
    res.status(200).send({ message: 'Stock movement recorded' });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
