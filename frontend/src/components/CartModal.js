import React from "react";
// import styled from "styled-components";
import "../styles/CartModal.css"

export const CartModal = ({closeModal}) => {
  return (
      
    <div className="modalBackground">
      <div className="modalContainer">
        {/* <button>X</button> */}
        <div className="header">
          <div>Cart</div>
          <div>Quantity</div>
          <button onClick={() => {closeModal(false)}}>X</button>
        </div>
      </div>
    </div>

  )
}
