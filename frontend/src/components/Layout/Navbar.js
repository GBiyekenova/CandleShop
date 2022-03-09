import React from "react";
import { Link } from "react-router-dom";

import "../../styles/Navbar.css"

function Navbar() {
  return (
    <ul>
      <li className="link"><Link to="/candles">Home</Link></li>
      <li className="link"> <Link to="/favourites">Favourites</Link></li>
      <li className="link"><Link to="/cart">Cart</Link></li>
    </ul>
  );
}

export default Navbar;
