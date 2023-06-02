import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Layout/Navbar";

import "../styles/AllPostings.css";
import SearchBox from "./Layout/SearchBox";
import Footer from "./Layout/Footer";

function AllPostings() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/candles`)
      .then((response) => {
        console.log("response");
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }, []);

  console.log("all", data)

  return (
    <div style={{padding:"100px 0 0 0"}}>
      <Navbar />
      {/* <SearchBox /> */}
      <div className="card">
        {data &&
          data.map((item, index) => (
            <div className="mr-b" key={index} onClick={() => navigate(`/candles/${item.id}`)}>
              <div>
                <img width="350" height="350" src={item.picture1} />
                {/* <img width="500px" height="500px" src={item.picture2} />
              <img width="500px" height="500px" src={item.picture3} /> */}
              </div>
              <div className="line">
                <h2 className="ctr">{item.name}</h2>
                <div className="ctr">${item.price}</div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllPostings;
