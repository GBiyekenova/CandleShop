import React from "react";
import "../../styles/Footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div className="footer">
      <div className="cl about">
        <div className="header">About Us:</div>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
      </div>
      <div className="cl">
        <div>
          <div className="contact-info header">Contact Information:</div>
          <div>Location: 10 Willow Park</div>
          <div>Phone number: 8707373737</div>
          <div>email: candles@candlecorp.com</div>
        </div>
      </div>
      <div className="cl">
        <div className="header">Social Connect:</div>
        <p><InstagramIcon /></p>
      </div>
    </div>
  );
}

export default Footer;
