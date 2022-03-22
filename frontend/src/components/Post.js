import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { CartContext } from "./CartContext";

import Navbar from "./Layout/Navbar";
import "../styles/Post.css";

function Post() {
  const [cart, setCart] = useContext(CartContext);
  const [data, setData] = useState(null);
  const { itemId } = useParams();
  // const [cart, setCart] = useState([]);
  // console.log(cart)

  useEffect(() => {
    axios
      .get(`/candles/${itemId}`)
      .then((response) => {
        console.log("response");
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }, []);

  const addToFav = () => {
    axios
      .post(`/candles/itemId`, { itemId })
      .then((response) => {
        console.log("response");
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const removeFromFav = () => {
    axios
      .post("/candles/remove", { itemId })
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const addToCart = (itemToAdd) => {
    console.log("Add to cart!");
    console.log(itemToAdd)
    let inCart = false;
    
    let updatedCart;
    updatedCart = cart.map((i) => {
      if (i.id === itemToAdd.id) {
        inCart = true;
        i.amount += 1;
        
      }
      return i;
    });
    if (inCart === false) {
      console.log(itemToAdd)
      updatedCart = [...cart, {...itemToAdd, amount: 1}];
    }
    setCart([...updatedCart]);
  };

  return (
    <div>
      <Navbar />
      {data && (
        <div className="product-block">
          <div className="product-info">
            <h1>{data.name}</h1>
            <div>{data.description}</div>
            <div>Price: {data.price}</div>
            <div>{data.quantity} in stock</div>
            <button onClick={() => addToCart(data)}>Add To Cart</button>
            {data.is_favourite ? (
              <button onClick={removeFromFav}>Remove From Favourites</button>
            ) : (
              <button onClick={addToFav}>Add To Favourites</button>
            )}
          </div>

          <div className="images">
            <img width="500px" height="500px" src={data.picture1} />
            <img width="500px" height="500px" src={data.picture2} />
            <img width="500px" height="500px" src={data.picture3} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
