import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import "../styles/CartModal.css";

import { CartContext } from "./CartContext";

const CartModal = ({ closeModal }) => {
  const [cart, setCart] = useContext(CartContext);

  const navigate = useNavigate();

  const removeFromCart = (itemToRemove) => {
    console.log("Remove from Cart");
    const newCart = cart.filter((item) => {
      return item.id !== itemToRemove.id;
    });
    setCart([...newCart]);
  };

  const decrease = (id) => {
    const newCart = cart.reduce((acc, val, index) => {
      if (val.id === id) {
        if (val.amount > 1) {
          val.amount -= 1;
          acc.push(val);
        }
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
    setCart([...newCart]);
  };

  const increase = (id) => {
    let currectCart = [...cart];
    currectCart.map((item) => {
      if (item.id === id) {
        return (item.amount += 1);
      }
    });
    setCart(currectCart);
  };
  return (
    <div
      className="modalBackground"
      // onClick={() => {
      //   closeModal(false);
      // }}
    >
      <div className="modalContainer">
        <div id="cart-close">
          <div>Cart</div>
          <button
            id="exit-btn"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="modal-header">
          <div>Products</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Order Summary</div>
        </div>
        <div id="cart-lf-rg">
          <div className="left-crt">
            {cart && cart.length > 0
              ? cart.map((item, index) => (
                  <div key={index}>
                    <tr onClick={() => navigate(`/candles/${item.id}`)} id="product-info">
                      <td>
                        <img width="100" height="100" src={item.picture1} />
                        <div>{item.name}</div>
                      </td>
                      <td>${item.price}</td>
                      <td>
                       {/*  className="ctr cart-btn" */}
                      <button onClick={() => increase(item.id)}>+</button>
                      <div>{item.amount}</div>
                      <button onClick={() => decrease(item.id)}>-</button>
                      <button onClick={() => removeFromCart(item)}>
                        REMOVE
                      </button>
                      </td>
                    </tr>
                  </div>
                ))
              : "Your cart is empty!"}
          </div>

          <div className="right">
            <form id="checkout" action="/create-checkout-session" method="POST">
              <button id="checkout-btn" type="submit">
                CHECKOUT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartModal;
