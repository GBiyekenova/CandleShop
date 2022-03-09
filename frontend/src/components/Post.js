import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


import Navbar from "./Layout/Navbar";
import "../styles/Post.css";

function Post() {
  const [data, setData] = useState(null);
  const { itemId } = useParams();

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


  }

  return (
    <div>
      <Navbar />
      {data && (
        <div className="product-block">
          <div className="product-info">
            <h1>
              {data.name}
              {data.id}
            </h1>
            <div>{data.description}</div>
            <div>Price: {data.price}</div>
            <div>{data.quantity} in stock</div>
            <button>Add To Cart</button>
            <button onClick={addToFav}>Add to Favourites</button>
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
