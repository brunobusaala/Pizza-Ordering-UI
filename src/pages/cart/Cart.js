import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = (props) => {
  let { cart } = props;
  return (
    <div>
      {cart.map((item) => {
        return <div key={item.itemId}>{item.quantity}</div>;
      })}
    </div>
  );
};

export default Cart;
