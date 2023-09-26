const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.get('/', (req, res) => {
  res.json("The server is working");
});

app.post('/api/secret', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: req.body.currency,
    automatic_payment_methods: {
      enabled: true,
    },
  })
  res.json({clientSecret: paymentIntent});
});

app.listen(process.env.PORT, () =>
  console.log("Node server listening on port: " + process.env.PORT)
);

// Export the Express API
module.exports = app;
