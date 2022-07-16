const router = require('express').Router();
require("dotenv").config();
// const stripe = require('stripe')(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

router.post("/payment", async(req, res) => {
  return await stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: "usd",
    description: 'Example charge',
  }, (stripeError, stripeResponse) => {
    if (stripeError) {
      res.status(500).json(stripeError);
    } else {
      res.status(200).json(stripeResponse);
    }
  });
});

module.exports = router;

