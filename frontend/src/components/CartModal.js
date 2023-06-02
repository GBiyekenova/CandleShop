import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import styled from "styled-components";
import "../styles/CartModal.css";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckoutButton from "./CheckoutButton";

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
  console.log("cart ",cart);
  
  let total=0;
  const cartInfo = (
    <div className="left-crt">
            {cart && cart.length > 0
              ? cart.map((item, index) => {
                console.log(item.price * item.amount)
                total += (item.price * item.amount);
                return (

                
                  <div key={index}>
                    <div>
                    <div
                     
                      id="product-info"
                    >
                      <div className="lft-img"
                       onClick={() => navigate(`/candles/${item.id}`)}>
                        <img
                          className="cart-img"
                          width="100"
                          height="100"
                          src={item.picture1}
                        />
                        <div id="product-name">{item.name}</div>
                      </div>
                      <div id="price">${item.price}</div>
                      <div id="inc-dec">
                        {/* className="ctr cart-btn" */}
                        <ButtonGroup size="small" variant="outlined" aria-label="outlined primary button group">
                          <Button onClick={() => increase(item.id)}>+</Button>
                          <div id="amount">{item.amount}</div>
                          <Button onClick={() => decrease(item.id)}>-</Button>
                        </ButtonGroup>
                        <button id="remove-btn" onClick={() => removeFromCart(item)}>
                          remove
                        </button> 
                        {/* <button onClick={() => increase(item.id)}>+</button>
                        <div>{item.amount}</div>
                        <button onClick={() => decrease(item.id)}>-</button>
                        <button onClick={() => removeFromCart(item)}>
                          REMOVE
                        </button> */}
                      </div>
                      <div id="subtotal">
                        $
                        {Number.isInteger(item.price * item.amount)
                          ? (item.price * item.amount).toFixed(2)
                          : item.price * item.amount}
                      </div>
                      
                    </div>

                    
                    </div>
                  </div>
                  )
                })
              : "Your cart is currently empty!"}
          </div>
          );
          console.log("totallll", total)
  

  return (
    <div
      className="modalBackground"
      // onClick={() => {
      //   closeModal(false);
      // }}
    >
      <div className="modalContainer">
        <div id="cart-close">
          <div style={{fontWeight:"bold", fontSize:"20px", marginBottom: "1em"}}>Shopping Bag</div>
          <button
            id="exit-btn"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        {cart && cart.length > 0 && (
          <div className="modal-header">
            <div>Products</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Sub Total</div>
            <div>Order Summary</div>
          </div>
        )}

        <div id="cart-lf-rg">
        {cartInfo}
          

          {cart && cart.length > 0 && (
            <div className="right-crt">
            
              <div id="delivery-info">
                <div id="delivery-title">
                  <div>
                    <h3>Standard Delivery</h3>
                    <span>FREE</span>
                  </div>
                  <div id="delivery-icon"><LocalShippingOutlinedIcon/></div>
                </div>
                <div>
                  <span>
                    Same Day Delivery, Pickup in Store, and more delivery
                    options available on Checkout.
                  </span>
                </div>
              </div>
              <tbody className="total">
                <tr>
                  <th>Sub Total</th>
                  <td>CA ${total.toFixed(2)}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>CA $0.00</td>
                </tr>
                <tr>
                  <th>Estimated Total</th>
                  <td>CA ${total.toFixed(2)}</td>
                </tr>
              </tbody>
              <CheckoutButton />
    
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartModal;
