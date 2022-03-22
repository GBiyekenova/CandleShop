import React, { useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Layout/Navbar";

import { CartContext } from "./CartContext";
// import useLocalStorage from "./useLocalStorage";

function Cart() {
  const [cart, setCart] = useContext(CartContext);

  const navigate = useNavigate();

  const removeFromCart = (itemToRemove) => {
    console.log("Remove from Cart");
    // let newCart = cart.map((item) => {
    //   if (item.id === itemToRemove.id) {
    //     if (item.amount > 1) {
    //       item.amount -= 1;
    //     } else if (item.amount === 1) {
    //       cart.filter((el) => el.id !== itemToRemove.id);
    //     }
    //   }
    // });
    const newCart = cart.reduce((acc, val, index)=>{
      if(val.id === itemToRemove.id){
        if(val.amount > 1){
          val.amount -= 1;
          acc.push(val)
        } 
      } else {
        acc.push(val)
      }
      return acc
    },[])
    //if i.id === item.id
    //if i.amount > 1 then remove -1;
    setCart([...newCart]);
  };
  return (
    <div>
      <Navbar />
      <div className="card">
        {cart &&
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
              <button onClick={() => removeFromCart(item)}>REMOVE</button>
            </div>
          ))}
        <button>CHECKOUT</button>
      </div>
    </div>
  );
}

export default Cart;
