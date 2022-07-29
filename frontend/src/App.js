import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Favourites from "./components/Favourites";
import Cart from "./components/Cart";
import Post from "./components/Post";
import AllPostings from "./components/AllPostings";
import { CartProvider } from "./components/CartContext";


import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/candles/:itemId" element={<Post />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/candles" element={<AllPostings />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
