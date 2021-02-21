import React from "react";
import { StyleSheet } from "react-native";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutDetails from "./CheckoutDetails";

const stripePromise = loadStripe(
  "pk_test_51IDASUGMKwBbdaOByrLwMB4BUCy1pu34phvsg39UIXdsOIFqpKZqeRzgBjDiWoHGfBg5UNDpbdt4PikZk0fLFE1c00vXq5PEjk"
);

const Stripe = ({ navigation }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutDetails navigation={navigation} />
    </Elements>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default Stripe;
