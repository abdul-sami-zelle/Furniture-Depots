import React, { useEffect } from "react";
import "./PaymentTypes.css";
import { useMyOrders } from "@/context/orderContext/ordersContext";

const PaymentTypes = ({
  selectedPaymentType,
  setSelectedPaymentType,
  onSelectLabel,
}) => {

  const paymentTypeCheckData = [
    {
      type: "cybersource_credit_card",
      sign: "Credit/Debit Card",
      logo: "/Assets/icons/card-2.png",
      paymentMethodId: "9879079j7mummjh",
    },
  ];

  const { activePaymentMethods, setOrderPayload } = useMyOrders();

  const checkPaymentMethodById = (id) => {
    const paymentMethod = activePaymentMethods?.find((pm) => pm.id === id);
    if (paymentMethod) {
      return paymentMethod;
    } else {
      return paymentMethod;
    }
  };

  useEffect(() => {
    setSelectedPaymentType(paymentTypeCheckData[0].type);
  }, []);

  useEffect(() => {
    setOrderPayload((prevData) => ({
      ...prevData,
      setOrderPayload: paymentTypeCheckData[0].type,
    }));
  }, []);

  const handleSelectPaymentType = (type) => {
    setSelectedPaymentType(type.type);
    onSelectLabel(type.type);
    checkPaymentMethodById(type.paymentMethodId);
  };

  return (
    <div className="payment-types-main-container">
      <div className="payment-types-select-boxes-container">
        {paymentTypeCheckData.map((item, index) => (
          <label
            key={index}
            onClick={() => handleSelectPaymentType(item)}
            className={`payment-select-option ${
              selectedPaymentType === item.type ? "select-payment" : ""
            }`}
          >
            <input
              type="radio"
              checked={selectedPaymentType === item.type}
              name="selectedPaymentType"
              onChange={() => handleSelectPaymentType(item)}
            />

            <div className="payment-types-select-label">
              {item.sign}
              <img
                src={item.logo}
                alt="logo"
                className="payment-type-paypal-logo"
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentTypes;
