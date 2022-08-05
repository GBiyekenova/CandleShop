import React, { useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";

import cartCss from "../styles/Cart.css";
import SearchBox from "./Layout/SearchBox";

import { CartContext } from "./CartContext";
import Footer from "./Layout/Footer";
// import useLocalStorage from "./useLocalStorage";

// import styled from "styled-components";


// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 90vh
// `
// const Button = styled.button`
//   min-width:  100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `

function Cart() {
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
    <div>
      <Navbar />
      <SearchBox />
      <div className="card">
        {cart && cart.length > 0
          ? cart.map((item, index) => (
              <div key={index}>
                <div onClick={() => navigate(`/candles/${item.id}`)}>
                  <div>
                    <img width="350" height="350" src={item.picture1} />
                  </div>
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
      {/* <Container>
        <Button>Modal</Button>
      </Container> */}
      <Footer />
    </div>
  );
}

export default Cart;
