import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../CartContext";

import "../../styles/Navbar.css"

function Navbar() {
  const [cart] = useContext(CartContext);
  
  let cartNum = 0;
  let cartCount = cart.map((item) => {
    cartNum += item.amount;
  })

  return (
    <ul>
      <li className="link"><Link to="/candles">Home</Link></li>
      <li className="link"> <Link to="/favourites">Favourites</Link></li>
      <li className="link"><Link to="/cart">Cart({cart ? cartNum : 0})</Link></li>
    </ul>
  );
}

export default Navbar;
