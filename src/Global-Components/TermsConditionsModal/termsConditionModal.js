'use client'

import React, { useEffect, useState } from "react";
import "./termsConditionsModal.css";
import { url } from "../../utils/api";
import { IoClose } from "react-icons/io5";
import Loader from "@/UI/Components/Loader/Loader";
import Image from "next/image";

const TermsConditionsModal = ({ openModal, closeModal }) => {
  const [termsContent, setTermsContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (openModal) {
      fetchTermsConditions();
    }
  }, [openModal]);

  const fetchTermsConditions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${url}/api/v1/pages/terms-conditions/get`); // Replace with your API URL
      const data = await response.json();
      setTermsContent(data?.termsConditions?.content); // Assuming the API returns { terms: "<p>Your content here</p>" }
    } catch (error) {
      setLoading(false)
      console.error("Failed to fetch terms and conditions:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className={`html-modal-main-container ${openModal ? "show-html-modal" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >

      <div className="html-modal-inner-container">
        {loading && <Loader />}
        <div className="terms-modal-head-contianer">
          <button className="term-condition-modal-close-button" onClick={closeModal}>
            <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt="close" />
          </button>
        </div>
        <div className="html-modal-inner-sub-container">
            <div dangerouslySetInnerHTML={{ __html: termsContent }} />
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsModal;
