import React from 'react'
import './BillingAddressModal.css';
import { IoClose } from "react-icons/io5";

const BillingAddressModal = ({ showBilling, handleCloseBillingModal }) => {

  return (
    <div className={`billing-modal-main-container ${showBilling ? 'show-billing-modal' : ''}`}>
      <div className='billing-modal-inner-container'>

        <div className='billing-modal-sub-container'>

          <div className='billing-sub-modal-head'>
            <h3>Billing Address</h3>

            <button className='billing-modal-close-button' onClick={handleCloseBillingModal}>
              <IoClose size={25} color='var(--text-gray)' />
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingAddressModal
