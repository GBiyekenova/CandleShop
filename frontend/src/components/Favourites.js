import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Layout/Navbar";
import SearchBox from "./Layout/SearchBox";

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
      <div className="card">
        {data &&
          data.map((item, index) => (
            <div key={index} onClick={() => navigate(`/candles/${item.id}`)}>
              <div>
                <img width="350" height="350" src={item.picture1} />
              </div>
              <div>
                <h1>{item.name}</h1>
                <div>${item.price}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Favourites;
