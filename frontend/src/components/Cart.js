import React, { useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";

import cartCss from "../styles/Cart.css"

import { CartContext } from "./CartContext";
// import useLocalStorage from "./useLocalStorage";

function Cart() {
  const [cart, setCart] = useContext(CartContext);

  const navigate = useNavigate();

  const removeFromCart = (itemToRemove) => {
    console.log("Remove from Cart");
    const newCart = cart.filter((item) => {
      return item.id !== itemToRemove.id

    })
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
    <div>
      <Navbar />
      <div className="card">
        {cart && cart.length > 0 ?
          cart.map((item, index) => (
            <div key={index}>
              <div onClick={() => navigate(`/candles/${item.id}`)}>
                <div>
                  <img width="350" height="350" src={item.picture1} />
                </div>
                <div>
                  <h1>{item.name}</h1>
                  <div>${item.price}</div>
                </div>
              </div>
              <button onClick={() => decrease(item.id)}>-</button>
              <div>{item.amount}</div>
              <button onClick={() => increase(item.id)}>+</button>
              <button onClick={() => removeFromCart(item)}>REMOVE</button>
            </div>
          )) : "Your cart is empty!"}
        <form id="checkout" action="/create-checkout-session" method="POST">
          <button width="50" height="10px" type="submit">
            CHECKOUT
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
