import React from "react";
import { StyleSheet } from "react-native";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutDetails from "./CheckoutDetails";

const stripePromise = loadStripe(
  ""
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
