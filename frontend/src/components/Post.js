import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { CartContext } from "./CartContext";

import "../styles/Post.css";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

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
    console.log(itemToAdd);
    let inCart = false;

    // let updatedCart;
    let updatedCart = cart.map((i) => {
      if (i.id === itemToAdd.id) {
        inCart = true;
        i.amount += 1;
      }
      return i;
    });
    if (inCart === false) {
      console.log(itemToAdd);
      updatedCart = [...cart, { ...itemToAdd, amount: 1 }];
    }
    setCart([...updatedCart]);
  };

  return (
    <div>
      <Navbar />
      {data && (
        <div className="product-block">
          {/* <div className="product-desc">  */}
          <div style={{ position: "relative", width: "50%" }}>
            <a id="back-btn" href="http://localhost:3000/candles">
              Back
            </a>
            <div className="product-info">
              <h1>{data.name}</h1>
              <p>{data.description}</p>
              <div className="price">${data.price}</div>
              <div>
                {data.quantity > 3 ? (
                  <div>In stock</div>
                ) : (
                  <div>A few left in stock</div>
                )}
              </div>
              <div className="btn-btn">
                <div>
                  {data.is_favourite ? (
                    <button className="btn red" onClick={removeFromFav}>
                      <FavoriteBorderIcon />
                    </button>
                  ) : (
                    <button className="btn" onClick={addToFav}>
                      <FavoriteBorderIcon />
                    </button>
                  )}
                </div>

                <button
                  className="btn add-to-cart"
                  onClick={() => addToCart(data)}
                >
                  Add To Your Cart
                </button>
              </div>
            </div>
          </div>

          <div className="images">
            <img width="500px" height="500px" src={data.picture1} />
            <img width="500px" height="500px" src={data.picture2} />
            <img width="500px" height="500px" src={data.picture3} />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Post;
