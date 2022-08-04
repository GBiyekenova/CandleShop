import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { CartContext } from "../CartContext";

import "../../styles/Navbar.css";

function Navbar() {
  const [cart] = useContext(CartContext);

  let cartNum = 0;
  let cartCount = cart.map((item) => {
    cartNum += item.amount;
  });

  return (
    <ul>
      <li id="logo" className="link" >
        <Link to="/candles">Candl</Link>
      </li>
      <li className="link">
        <Link to="/candles">Shop</Link>
      </li>
      <div className="float-right">
      <li className="link">
        <Link to="/favourites"><FavoriteBorderIcon /></Link>
      </li>
      <li className="link">
      
        <Link to="/cart"> <ShoppingCartIcon />({cartCount ? cartNum : 0})</Link>
      </li>

      </div>
    </ul>
  );
}

export default Navbar;
