"use client";

import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import "./DeliveryInfo.css";

import { useMyOrders } from "@/context/orderContext/ordersContext";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext/globalContext";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsShop } from "react-icons/bs";
import { useCart } from "@/context/cartContext/cartContext";
import LocationPopUp from "../LocationPopUp/LocationPopUp";
import InputText from "@/Global-Components/InputText/InputText";

const DeliveryInfo = forwardRef((props, ref) => {
  const { isDeliveryAllowed } = useGlobalContext();
  const navigate = useRouter();
  const [editZip, setEditZip] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const { orderPayload, handleNestedValueChange } = useMyOrders();
  const [error, setError] = useState({});

  const handleNavigateToSignup = () => {
    navigate.push("/my-account");
  };

  const handleSubmitDeliveryInfo = () => {
    let newErrors = {};

    Object.keys(orderPayload?.billing).forEach((field) => {
      if (field === "address2") return;
      if (field === "alt_phone") return;

      if (!orderPayload?.billing?.[field]?.trim()) {
        newErrors[field] = `Required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError((prev) => ({ ...prev, ...newErrors }));
      console.error("Errors found: ", newErrors);
      return false;
    }

    setError({});
    props.onSubmit();
    return true;
  };

  useImperativeHandle(ref, () => ({
    validateAndSubmit: handleSubmitDeliveryInfo,
  }));

  const {
    selectedOption,
    handleChange,
    selectedShippingMethods,
    shippingMethods,
    getShippingMethods,
  } = useGlobalContext();

  const { subTotal } = useCart();

  const [locationDetails, setLocationDetails] = useState({
    zipCode: "",
    city: "",
    state: "",
    country: "",
  });

  const handleCloseSearch = () => {
    setEditZip(false);
  };

  useEffect(() => {
    const id = localStorage.getItem("uuid");
    const token = localStorage.getItem("userToken");

    if (id && token) {
      setUserId(id);
      setUserToken(token);
    }
  }, []);

  useEffect(() => {
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods["shippingMethods"]);
    }
  }, []);

  useEffect(() => {
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods["shippingMethods"]);
      setIsStarted(!isStarted);
    }
  }, [subTotal, shippingMethods]); // Dependency array for changes in subTotal or shippingMethods

  useEffect(() => {
    if (shippingMethods) {
      getShippingMethods(subTotal, shippingMethods["shippingMethods"]);
    }
  }, [isStarted]);

  return (
    <div className="delivery-form-main-container">
      {selectedShippingMethods && (
        <div className="shipping-methods-checkout-main-contianer">
          <h3 className="choose-delivery-checkout-heading">
            Choose Delivery Options
          </h3>
          <div className="checkout-page-shipping-method-inner-container">
            {selectedShippingMethods &&
              selectedShippingMethods?.map((option, index) => (
                <div
                  className="cart-delivary-card"
                  onClick={() => handleChange(null, option)}
                >
                  {index === 0 ? (
                    <LiaShippingFastSolid
                      color="var(--text-charcol)"
                      className="cart-protection-card-icon"
                    />
                  ) : (
                    <BsShop
                      color="var(--text-charcol)"
                      className="cart-protection-card-icon"
                    />
                  )}

                  <div className="cart-protection-plan-details-container">
                    <p className="cart-protection-plan-card-header">
                      {option.name}
                    </p>
                  </div>
                  <div className="cart-protection-radio-container">
                    <label
                      key={option.id}
                      className="custom-radio"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <input
                        type="radio"
                        name="options"
                        value={option.id}
                        checked={selectedOption?.id === option.id}
                        readOnly
                        onChange={(e) => handleChange(e, option, index)} // Pass the `option` object
                      />
                      <span className="radio-mark" />
                    </label>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <p>All Fields Required Unless indicated Optional </p>

      <div className="delivery-form-signup-container">
        <h3>Your Information</h3>

        <InputText
          label={"Email *"}
          payload={orderPayload}
          error={error.email}
          isAllowed={isDeliveryAllowed}
          input_name={"email"}
          value={orderPayload?.billing?.email}
          onChange={handleNestedValueChange}
          width="60%"
        />

        {!userId && !userToken && (
          <span>
            Already have an account{" "}
            <p onClick={handleNavigateToSignup}>SIGN IN</p>
          </span>
        )}
        {!userId && !userToken && (
          <p>You Can Create an Account After Checkout.</p>
        )}
      </div>

      <div className="delivery-info-input-main-container">
        <h3>Delivery Information</h3>

        <div className="delivery-info-input-first-and-last-name">
          <InputText
            label={"First Name *"}
            payload={orderPayload}
            error={error.first_name}
            isAllowed={isDeliveryAllowed}
            input_name={"first_name"}
            value={orderPayload?.billing?.first_name}
            onChange={handleNestedValueChange}
          />

          <InputText
            label={"Last Name *"}
            payload={orderPayload}
            error={error.last_name}
            isAllowed={isDeliveryAllowed}
            input_name={"last_name"}
            value={orderPayload?.billing?.last_name}
            onChange={handleNestedValueChange}
          />
        </div>

        <div className="delivery-info-email-and-phone">
          <InputText
            label={"Phone *"}
            payload={orderPayload}
            error={error.phone}
            isAllowed={isDeliveryAllowed}
            input_name={"phone"}
            value={orderPayload?.billing?.phone}
            onChange={handleNestedValueChange}
          />

          <InputText
            label={"Alternate Phone"}
            payload={orderPayload}
            error={error.alt_phone}
            isAllowed={isDeliveryAllowed}
            input_name={"alt_phone"}
            value={orderPayload?.billing?.alt_phone}
            onChange={handleNestedValueChange}
          />
        </div>

        <InputText
          label={"Address *"}
          payload={orderPayload}
          error={error.address_1}
          isAllowed={isDeliveryAllowed}
          input_name={"address_1"}
          value={orderPayload?.billing?.address_1}
          onChange={handleNestedValueChange}
        />

        <InputText
          label={"Apt, Suite, Building, (Optional)"}
          payload={orderPayload}
          error={error.address_2}
          isAllowed={isDeliveryAllowed}
          input_name={"address_2"}
          value={orderPayload?.billing?.address_2}
          onChange={handleNestedValueChange}
        />

        <div className="delivery-options-city-and-state">
          <InputText
            label={"Zip Code *"}
            payload={orderPayload}
            error={error.postal_code}
            isAllowed={isDeliveryAllowed}
            input_name={"postal_code"}
            value={orderPayload?.billing?.postal_code}
            onChange={handleNestedValueChange}
            maxLen={5}
            readOnly={true}
          />

          <InputText
            label={"State *"}
            payload={orderPayload}
            error={error.state}
            isAllowed={isDeliveryAllowed}
            input_name={"state"}
            value={orderPayload?.billing?.state}
            onChange={handleNestedValueChange}
            readOnly={true}
          />

          <InputText
            label={"City *"}
            payload={orderPayload}
            error={error.city}
            isAllowed={isDeliveryAllowed}
            input_name={"city"}
            value={orderPayload?.billing?.city}
            onChange={handleNestedValueChange}
            readOnly={true}
          />
        </div>

        <button
          className="edit-or-not-zip-code"
          onClick={() => setEditZip((prev) => (prev === false ? true : false))}
        >
          Change Zipcode?
        </button>
      </div>

      <LocationPopUp
        searchLocation={editZip}
        handleCloseSearch={handleCloseSearch}
        setLocationDetails={setLocationDetails}
        locationDetails={locationDetails}
      />
    </div>
  );
});

export default DeliveryInfo;
