const express = require("express");
const app = express();

const stripe = require("stripe")(
  "sk_test_51IDASUGMKwBbdaOBTD50A3cjPW23Bw35rLxlbEHNTDBGSsclvqHjZgOlCYkruzg21PJsYksCohAfx6XKItK5lUng00nxmbiNYA"
);

app.post("/createCustomer", async (req, res) => {
  const { nume, email, telefon } = req.body;
  try {
    const customer = await stripe.customers.create({
      name: nume,
      email: email,
      phone: telefon,
    });

    return res.status(200).json({
      data: customer.id,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;
