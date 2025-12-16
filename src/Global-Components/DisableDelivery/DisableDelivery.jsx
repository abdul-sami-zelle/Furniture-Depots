import React, { useEffect, useRef, useState } from "react";
import "./DisableDelivery.css";
import { useGlobalContext } from "@/context/GlobalContext/globalContext";

const DisableDelivery = ({ parentRef }) => {
  const { info, setSearchLocation } = useGlobalContext();
  const notDeliveryMessageRef = useRef(null);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (parentRef.current && notDeliveryMessageRef.current) {
        const parentRect = parentRef.current.getBoundingClientRect();

        // when the parent's bottom is below the viewport bottom + summary height
        if (parentRect.bottom <= window.innerHeight) {
          setIsFixed(false);
        } else {
          setIsFixed(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={notDeliveryMessageRef}
      className={`zip-not-under-delivery-area-message-contianer ${
        isFixed ? "make-sticky" : ""
      }`}
    >
      <span className="zip-not-underdelivery-message">
        <p className="desktop-not-delivery-message">
          We're currently not offering delivery to {info?.locationData?.zipCode}
        </p>
        <p className="mobile-not-delivery-message">
          We're not offering delivery to {info?.locationData?.zipCode}
        </p>
      </span>

      <button
        className="bottom-zip-update-button"
        onClick={() => setSearchLocation(true)}
      >
        Change Zip Code
      </button>
    </div>
  );
};

export default DisableDelivery;
