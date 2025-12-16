import React from "react";
import "./OrderConfirmationPage.css";
import { truncateTitle } from "../../../utils/api";
import { url } from "../../../utils/api";
import { formatePrice } from "@/utils/midlewares";

export default function CartItemOC({
  image,
  name,
  quantity,
  regular_price,
  options,
  price,
}) {
  return (
    <>
      <div className="confirmed-order-product-main">
        <div className="confirmed-order-product-image">
          <p>{quantity}</p>
          <img src={`${url}${image}`} alt="product" />
        </div>
        <div className="confirmed-order-product-details">
          <div className="confirmed-order-name-and-price">
            <h3>{truncateTitle(name, 15)}</h3>
            <span>
              <del>{formatePrice(regular_price)}</del>
              <p>{formatePrice(price)}</p>
            </span>
          </div>
          {options &&
            options.map((item, index) => (
              <p key={index}>{item?.options[0].name}</p>
            ))}
        </div>
      </div>
    </>
  );
}
