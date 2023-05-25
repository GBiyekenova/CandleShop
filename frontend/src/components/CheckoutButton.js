import React, { useContext } from "react";
import axios from "axios";

import { CartContext } from "./CartContext";

const checkout = (cart) => {
  axios
    .post("/create-checkout-session", { cart })
    .then((response) => {
      console.log("SUCCESS", response);
      window.location.href = response.data.url;
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const CheckoutButton = () => {
  const [cart, setCart] = useContext(CartContext);
  return (
    <div
      onClick={() => {
        checkout(cart);
      }}
      // id="checkout"
    >
      <button id="checkout-btn">CHECKOUT</button>
    </div>
  );
};

export default CheckoutButton;
