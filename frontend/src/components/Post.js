import React from "react";
import Navbar from "./Layout/Navbar";

import "../styles/Post.css"

function Post() {
  return (
    <div>
      <Navbar />
      <div className="product-block">
        <div className="product-info">
        <h1>CandleName</h1>
      <div>
        LLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div>Price: $12.99</div>
      <div>12 in stock</div>
      <button>Add To Cart</button>
      <button>Add to Favourites</button>
      </div>
      
      <div className="images">
        <img 
          width="500px"
          height="500px"
          src="https://images.unsplash.com/photo-1549877696-a46dda28ffa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <img
          width="500px"
          height="500px"
          src="https://images.unsplash.com/photo-1549877696-a46dda28ffa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <img
          width="500px"
          height="500px"
          src="https://images.unsplash.com/photo-1549877696-a46dda28ffa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
      </div>
      </div>
      
      
    </div>
  );
}

export default Post;
