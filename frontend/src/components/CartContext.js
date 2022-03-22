import React, { useState, createContext, useEffect, useRef } from "react";

export const CartContext = createContext();

export function CartProvider(props) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("item")) || []);
  
  useEffect(() => {
      console.log("Writing storage")
    localStorage.setItem("item", JSON.stringify(cart));
  
  }, [cart]);

  return <CartContext.Provider value={[cart, setCart]}>{props.children}</CartContext.Provider>;
}
