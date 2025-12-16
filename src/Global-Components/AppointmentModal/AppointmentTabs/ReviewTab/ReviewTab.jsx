"use client";

import React, { useState } from "react";
import "./ReviewTab.css";
import { useAppointment } from "../../../../context/AppointmentContext/AppointmentContext";
import { formatPhoneNumber } from "../../../../utils/api";
import { useGlobalContext } from "@/context/GlobalContext/globalContext";
import InputText from "@/Global-Components/InputText/InputText";

const ReviewTab = ({
  handleSubmitAppointment,
  selectedTab,
  setSelectedTab,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const { appointmentPayload, setAppointmentPayload, error } = useAppointment();
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setAppointmentPayload((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: name === "contact" ? formatPhoneNumber(value) : value,
      },
    }));
  };

  const handlePrevTab = () => {
    setSelectedTab(selectedTab - 1);
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const { isDeliveryAllowed } = useGlobalContext();

  return (
    <div className="review-tab-main-container">
      <h3>Please provide your details to be added to our appointment book</h3>

      <div className="review-tab-form">
        <div className="review-tab-first-and-last-name-container">
          <InputText
            label={"First Name *"}
            payload={appointmentPayload}
            error={error.firstName}
            isAllowed={isDeliveryAllowed}
            input_name={"firstName"}
            value={appointmentPayload.details.firstName}
            onChange={handleUserDataChange}
          />

          <InputText
            label={"Last Name *"}
            payload={appointmentPayload}
            error={error.lastName}
            isAllowed={isDeliveryAllowed}
            input_name={"lastName"}
            value={appointmentPayload.details.lastName}
            onChange={handleUserDataChange}
          />
        </div>

        <div className="review-tab-first-and-last-name-container">
          <InputText
            label={"email *"}
            payload={appointmentPayload}
            error={error.email}
            isAllowed={isDeliveryAllowed}
            input_name={"email"}
            value={appointmentPayload.details.email}
            onChange={handleUserDataChange}
          />

          <InputText
            label={"Contact *"}
            payload={appointmentPayload}
            error={error.contact}
            isAllowed={isDeliveryAllowed}
            input_name={"contact"}
            value={appointmentPayload.details.contact}
            onChange={handleUserDataChange}
          />
        </div>

        <InputText
          label={"Address *"}
          payload={appointmentPayload}
          error={error.address}
          isAllowed={isDeliveryAllowed}
          input_name={"address"}
          value={appointmentPayload.details.address}
          onChange={handleUserDataChange}
        />

        <div className="confirm-associate-container">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <h3>Was there an associate that you were working with?</h3>
        </div>

        {isChecked && (
          <InputText
            label={"Associate Name *"}
            payload={appointmentPayload}
            error={error.associate}
            isAllowed={isDeliveryAllowed}
            input_name={"associate"}
            value={appointmentPayload.details.associate}
            onChange={handleUserDataChange}
          />
        )}

        <div className="type-selected-button">
          <button onClick={handlePrevTab}>Previous</button>
          <button onClick={handleSubmitAppointment}>Book Consultant</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTab;
