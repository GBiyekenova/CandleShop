import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";


import Favourites from "./components/Favourites";
import Cart from "./components/Cart";
import Post from "./components/Post";

import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Post />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
        {/* <>{!data ? "Loading..." : data}</> */}
    </Router>
  );
}

export default App;
