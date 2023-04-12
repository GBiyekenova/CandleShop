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
    <div className="modalBackground">
      <div className="modalContainer">
          <div>Cart</div> <br/>
        <div className="modal-header">
          <div>Products</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Order Summary</div>
          <button
            id="exit-btn"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>

        <div id="cart-lf-rg">
          <div className="left-crt">
            {cart && cart.length > 0
              ? cart.map((item, index) => (
                  <div key={index}>
                    <tr onClick={() => navigate(`/candles/${item.id}`)}>
                      {/* <div> */}
                        <td>
                          <img width="100" height="100" src={item.picture1} />
                        </td>
                        {/* </div> */}
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                    </tr>

                    <tr >{/*  className="ctr cart-btn" */}
                      <button onClick={() => increase(item.id)}>+</button>
                      <div>{item.amount}</div>
                      <button onClick={() => decrease(item.id)}>-</button>
                      <button onClick={() => removeFromCart(item)}>
                        REMOVE
                      </button>
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

// function CartModal(props) {
//   const [activeTab, setActiveTab] = useState('quantity');
//   const [cartItems, setCartItems] = useState([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Function to open the cart modal
//   const openModal = () => {
//     document.getElementById('cart-modal').style.display = 'block';
//   };

//   // Function to close the cart modal
//   const closeModal = () => {
//     document.getElementById('cart-modal').style.display = 'none';
//   };

//   // Function to switch between tabs
//   const openTab = (event, tabName) => {
//     const tabContents = document.getElementsByClassName('tabcontent');
//     for (let i = 0; i < tabContents.length; i++) {
//       tabContents[i].style.display = 'none';
//     }
//     const tabLinks = document.getElementsByClassName('tablinks');
//     for (let i = 0; i < tabLinks.length; i++) {
//       tabLinks[i].className = tabLinks[i].className.replace(' active', '');
//     }
//     document.getElementById(tabName).style.display = 'block';
//     event.currentTarget.className += ' active';
//     setActiveTab(tabName);
//   };

//   // Function to add an item to the cart
//   const addItem = (item) => {
//     const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
//     if (existingItemIndex >= 0) {
//       const updatedCartItems = [...cartItems];
//       updatedCartItems[existingItemIndex].quantity++;
//       setCartItems(updatedCartItems);
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   // Function to remove an item from the cart
//   const removeItem = (itemId) => {
//     const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== itemId);
//     setCartItems(updatedCartItems);
//   };

//   // Function to update the total items and total price
//   const updateTotals = () => {
//     let newTotalItems = 0;
//     let newTotalPrice = 0;
//     cartItems.forEach((cartItem) => {
//       newTotalItems += cartItem.quantity;
//       newTotalPrice += cartItem.quantity * cartItem.price;
//     });
//     setTotalItems(newTotalItems);
//     setTotalPrice(newTotalPrice);
//   };

//   // Function to handle clicking the checkout button
//   const handleCheckout = () => {
//     // Do something with the cart data (e.g. send to server)
//     // ...
//     // Close the modal
//     closeModal();
//   };

//   return (
//     <>
//       {/* Button to open the cart modal */}
//       <button onClick={openModal}>Open Cart</button>

//       {/* Cart modal */}
//       <div id="cart-modal" className="modal">
//         <div className="modal-content">
//           <div className="modal-header">
//             <span className="close" onClick={closeModal}>&times;</span>
//             <h2>Your Cart</h2>
//           </div>
//           <div className="modal-body">
//             {/* Quantity tab */}
//             <div className="tab">
//               <button className={activeTab === 'quantity' ? 'tablinks active' : 'tablinks'} onClick={(event) => openTab(event, 'quantity')}>Quantity</button>
//               <div id="quantity" className={activeTab === 'quantity' ? 'tabcontent active' : 'tabcontent'}>
//                 {cartItems.length > 0 ? (
//                   <ul className="cart-items">
//                     {cartItems.map((cartItem) => (
//                       <li key={cartItem.id}>
//                         <div>{cartItem.name}</div>
//                         <div>Quantity: {cartItem.quantity}</div>
//                         <div>Price: ${cartItem.price}</div>
//                         <button onClick={() => removeItem(cartItem.id)}>Remove</button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>Your cart is empty.</p>
//                 )}
//                 <div className="total">
//                   <div>Total Items: {totalItems}</div>
//                   <div>Total Price: ${totalPrice.toFixed(2)}</div>
//                 </div>
//               </div>
//             </div>

//             {/* Order summary tab */}
//             <div className="tab">
//               <button className={activeTab === 'summary' ? 'tablinks active' : 'tablinks'} onClick={(event) => openTab(event, 'summary')}>Order Summary</button>
//               <div id="summary" className={activeTab === 'summary' ? 'tabcontent active' : 'tabcontent'}>
//                 <div className="total">
//                   <div>Total Items: {totalItems}</div>
//                   <div>Total Price: ${totalPrice.toFixed(2)}</div>
//                 </div>
//                 <button onClick={handleCheckout}>Checkout</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CartModal;
