import React, { useContext } from "react";
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
    <div className="modalBackground">
      <div className="modalContainer">

        <div className="modal-header">
          <div>Cart</div>
          <div>Quantity</div>
          <button
          id="exit-btn"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>

        </div>
        <div className="card">
          {cart && cart.length > 0
            ? cart.map((item, index) => (
                <div key={index}>
                  <div onClick={() => navigate(`/candles/${item.id}`)}>
                    {/* <div>
                      <img width="350" height="350" src={item.picture1} />
                    </div> */}
                    <div className="line">
                      <h1 className="ctr">{item.name}</h1>
                      <div className="ctr">${item.price}</div>
                    </div>
                  </div>
                  <div className="ctr cart-btn">
                    <button onClick={() => increase(item.id)}>+</button>
                    <div>{item.amount}</div>
                    <button onClick={() => decrease(item.id)}>-</button>
                    <button onClick={() => removeFromCart(item)}>REMOVE</button>
                  </div>
                </div>
              ))
            : "Your cart is empty!"}
          <form id="checkout" action="/create-checkout-session" method="POST">
            <button id="checkout-btn" type="submit">
              CHECKOUT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CartModal;
