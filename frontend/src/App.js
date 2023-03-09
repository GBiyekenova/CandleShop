import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Layout/Navbar";
import  CartModal  from "./components/CartModal";
import Favourites from "./components/Favourites";
import Cart from "./components/Cart";
import Post from "./components/Post";
import AllPostings from "./components/AllPostings";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./components/LandingPage";


import "./App.css";
// import { CartModal } from "./components/CartModal";

function App() {
  return (
    <CartProvider>
      <Router>
          <Navbar />
        <Routes>
        <Route path="/" element={<LandingPage />}></Route>
          <Route path="/candles/:itemId" element={<Post />}></Route>
          {/* <Route path="/cart" element={<CartModal />}></Route> */}
          <Route path="/candles" element={<AllPostings />}></Route>
          <Route path="/favourites" element={<Favourites />}></Route>

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
