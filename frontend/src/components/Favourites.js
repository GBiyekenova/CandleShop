import React from "react";
import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../styles/Favourites.css";

import Navbar from "./Layout/Navbar";
import SearchBox from "./Layout/SearchBox";
import Footer from "./Layout/Footer";

import { CartContext } from "./CartContext";

function Favourites() {
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`/favourites`)
      .then((response) => {
        console.log("response");
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }, []);




  const removeFromFav = (index) => {
    axios
      .post("/candles/remove", { itemId: index })
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
  console.log(data)

  return (
    <div style={{padding:"100px 0 0 0"}}>
      <Navbar />
      <h3 className="pg-name2">Your Wishlist</h3>
      {/* <div className="card"> */}
      <div style={{margin: "3em",  minHeight:"70vh"}}>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            // <div className="mr-b" key={index} onClick={() => navigate(`/candles/${item.id}`)}>
            //   <div>
            //     <img width="350" height="350" src={item.picture1} />
            //   </div>
            //   <div className="line">
            //     <h2 className="ctr">{item.name}</h2>
            //     <div className="ctr">${item.price}</div>
            //   </div>
            // </div>

            <div id="product-info2">
              <div
                className="lft-img2"
                onClick={() => navigate(`/candles/${item.id}`)}
              >
                <img
                  className="cart-img2"
                  width="100"
                  height="100"
                  src={item.picture1}
                />
                <div className="name-price">
                  <div id="product-name2">{item.name}</div>
                  <div id="price2">${item.price}</div>
                </div>
                </div>
                
                <div className="add-remove">
                  <button className="add-to-cart" onClick={() => addToCart(item)}>Add To Bag</button>
                  <button className="rm-border" onClick={()=>{removeFromFav(item.id)}} >Remove</button>
                </div>
              
            </div>
          ))
        ) : (
          <div className="pg-name">You have no favorites yet!</div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Favourites;
