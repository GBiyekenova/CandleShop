import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Layout/Navbar";
import SearchBox from "./Layout/SearchBox";
import Footer from "./Layout/Footer";

function Favourites() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div>
      <Navbar />
      <SearchBox />
      <div className="pg-name">Your Favourites</div>
      <div className="card">
        {data && data.length > 0 ?
          data.map((item, index) => (
            <div className="mr-b" key={index} onClick={() => navigate(`/candles/${item.id}`)}>
              <div>
                <img width="350" height="350" src={item.picture1} />
              </div>
              <div className="line">
                <h2 className="ctr">{item.name}</h2>
                <div className="ctr">${item.price}</div>
              </div>
            </div>
          )) : <div className="pg-name">You have no favorites yet!</div>}
      </div>
      <Footer />
    </div>
  );
}

export default Favourites;
