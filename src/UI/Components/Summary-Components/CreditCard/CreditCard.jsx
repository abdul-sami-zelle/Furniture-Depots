import React, {
  useEffect,
  useState,
  useImperativeHandle,
  ref,
  forwardRef,
  useRef,
} from "react";
import "./CreditCard.css";
import { useMyOrders } from "@/context/orderContext/ordersContext";
import { useGlobalContext } from "@/context/GlobalContext/globalContext";
import InputText from "@/Global-Components/InputText/InputText";

const CreditCard = () => {
  const [focusedField, setFocusedField] = useState("");

  const { creditCardData, setCreditCardData, error, setError } = useMyOrders();

  const nameRef = useRef(null);

  const detectCardType = (cardNumber) => {
    const cardTypes = {
      visa: /^4/,
      mastercard: /^5/,
      amex: /^3[47]/, // American Express starts with 34 or 37
      discover: /^6/, // Discover cards typically start with 6
    };

    // Check the card number's first digit and match with card type
    for (const [type, regex] of Object.entries(cardTypes)) {
      if (regex.test(cardNumber)) {
        return type;
      }
    }

    return ""; // Default to empty string if no match found
  };

  const { isDeliveryAllowed } = useGlobalContext();

  return (
    <div className="credit-card-type-main-container">
      <div className="credit-card-type-head">
        <img src={"/Assets/icons/mastercard-1.png"} alt="card" />
        <img src={"/Assets/icons/visa-1.png"} alt="card" />
        <img src={"/Assets/icons/discover-1.png"} alt="card" />
        <img src={"/Assets/icons/ae-1.png"} alt="card" />
      </div>
      <div className="credit-card-type-body">
        <div className="credit-card-inputs">
          <InputText
            label={"Card holder Name *"}
            payload={creditCardData}
            error={error.card_holder_name}
            isAllowed={isDeliveryAllowed}
            input_name={"card_holder_name"}
            value={creditCardData.card_holder_name}
            onChange={(e) => {
              if (isDeliveryAllowed) return;
              const { value } = e.target;
              setCreditCardData((prevData) => ({
                ...prevData,
                card_holder_name: value,
              }));
              setError((prev) => ({ ...prev, card_holder_name: "" }));
            }}
          />


          <InputText
            label={"Card Number *"}
            payload={creditCardData}
            error={error.card_number}
            isAllowed={isDeliveryAllowed}
            input_name={"card_number"}
            value={creditCardData.card_number}
            onChange={(e) => {
              if (isDeliveryAllowed) return;
              let { value } = e.target;
              value = value.replace(/\D/g, ""); // Remove all non-digit characters
              if (value.length > 16) {
                value = value.slice(0, 16); // Keep only the first 16 digits
              }

              // Format card number with dashes after every 4 digits
              const formattedValue = value
                .replace(/(\d{4})(?=\d)/g, "$1-") // Add dash after every 4 digits
                .slice(0, 19); // Ensure the formatted value doesn't exceed 19 characters (4 sets of 4 digits + 3 dashes)

              // Set card type based on the card number
              const cardType = detectCardType(formattedValue.replace(/-/g, "")); // Remove dashes for detection

              setCreditCardData((prevData) => ({
                ...prevData,
                card_number: formattedValue,
                card_type: cardType, // Set the detected card type
              }));
              setError((prev) => ({ ...prev, card_number: "" }));
            }}
          />

        </div>

        <div className="credit-card-expiry-and-code-inputs">

          <InputText
            label={"Expiry Date *"}
            payload={creditCardData}
            error={error.expiry_date}
            isAllowed={isDeliveryAllowed}
            input_name={"expiry_date"}
            value={creditCardData.expiry_date}
            readOnly={isDeliveryAllowed}
            onChange={(e) => {
              if (isDeliveryAllowed) return;
              let { value } = e.target;
              value = value.replace(/[^0-9/]/g, "");
              if (value.length === 2 && !value.includes("/")) {
                value = `${value}/`; // Add slash after the month
              }
              const [month, year] = value.split("/");
              if (month && parseInt(month, 10) > 12) {
                value = ""; // Reset if month exceeds 12
                alert("Invalid month. Please enter a value between 01 and 12.");
              }
              if (value.length > 5) {
                value = value.slice(0, 5); // Limit length to MM/YY format
              }
              setCreditCardData((prevData) => ({
                ...prevData,
                expiry_date: value,
              }));
              setError((prev) => ({ ...prev, expiry_date: "" }));
            }}
          />

          <InputText
            label={"CVV *"}
            payload={creditCardData}
            error={error.sec_code}
            isAllowed={isDeliveryAllowed}
            input_name={"sec_code"}
            value={creditCardData.sec_code}
            readOnly={isDeliveryAllowed}
            onChange={(e) => {
                if (isDeliveryAllowed) return;
                let { value } = e.target;
                value = value.replace(/\D/g, "");
                if (value.length > 4) {
                  value = value.slice(0, 4); // Keep only the first 16 digits
                }
                const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-");
                setCreditCardData((prevData) => ({
                  ...prevData,
                  sec_code: formattedValue,
                }));
                setError((prev) => ({ ...prev, sec_code: "" }));
              }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
