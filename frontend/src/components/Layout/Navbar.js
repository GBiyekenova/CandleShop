import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import { CartContext } from "../CartContext";

import "../../styles/Navbar.css";
import  CartModal  from "../CartModal";

function Navbar() {
  const [cart] = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  let cartNum = 0;
  let cartCount = cart.map((item) => {
    cartNum += item.amount;
  });
  console.log(cartCount)
  console.log(cart)

  return (
    <ul>
      <li id="logo" className="link">
        <Link to="/">Candl</Link>
      </li>
      <li className="link">
        <Link to="/candles">All Products</Link>
      </li>
      <div className="float-right">
        <li className="link">
          <Link to="/favourites">
            <BookmarkBorderOutlinedIcon />
          </Link>
        </li>
        {/* <li className="link">
      
        <Link to="/cart"> <ShoppingCartIcon />({cartCount ? cartNum : 0})</Link>
      </li> */}

        <button
        style={{border: "none", backgroundColor: "transparent", cursor:"pointer"}}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <ShoppingBagOutlinedIcon />{cartCount ? cartNum : 0}
        </button>
        {openModal && <CartModal closeModal={setOpenModal} />}
      </div>
    </ul>
  );
}

export default Navbar;
