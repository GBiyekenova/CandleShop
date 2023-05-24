import React from "react";
import "../styles/CheckoutSuccess.css"

const CheckoutSuccess = () => {
  return (
    <div className="thankyou-page">
      <h2>Checkout Success</h2>
      <h2>Thank you for your purchase!</h2>
      <a href="http://localhost:3000/candles">Continue Shopping</a>
    </div>
  );
};

export default CheckoutSuccess;
