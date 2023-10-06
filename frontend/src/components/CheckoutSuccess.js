import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutSuccess.css"

const CheckoutSuccess = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/candles`)
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
    <div className="thankyou-page">
      <h2>Checkout Success</h2>
      <h2>Thank you for your purchase</h2>
      <h3>Your order number is: {Math.floor(Math.random() * 899999 + 100000)}</h3>
      <a href="http://localhost:3000/candles">Continue Shopping</a>
      <section style={{fontSize: "30px",
    textTransform: "uppercase"}}>Products you may like</section>
      <div style={{display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"}}>{data &&
          data.map((item, index) => (
            <div className="mr-b" key={index} onClick={() => navigate(`/candles/${item.id}`)}>
              <div>
                <img width="250" height="250" src={item.picture1} />
                {/* <img width="500px" height="500px" src={item.picture2} />
              <img width="500px" height="500px" src={item.picture3} /> */}
              </div>
              {/* <div className="line">
                <h2 className="ctr">{item.name}</h2>
                <div className="ctr">${item.price}</div>
              </div> */}
            </div>
          ))}</div>
    </div>
  );
};

export default CheckoutSuccess;
