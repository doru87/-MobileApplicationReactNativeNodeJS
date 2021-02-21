const express = require("express");
const app = express();

const stripe = require("stripe")(
  "sk_test_51IDASUGMKwBbdaOBTD50A3cjPW23Bw35rLxlbEHNTDBGSsclvqHjZgOlCYkruzg21PJsYksCohAfx6XKItK5lUng00nxmbiNYA"
);

app.post("/charge", async (req, res) => {
  const { id, amount, email, customerId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "ron",
      payment_method_types: ["card"],
      payment_method: id,
      customer: customerId,
      receipt_email: email,
      confirm: true,
    });

    return res.status(200).json({
      confirm: paymentIntent,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;
