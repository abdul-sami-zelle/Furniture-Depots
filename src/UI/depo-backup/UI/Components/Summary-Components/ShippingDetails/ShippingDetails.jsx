import React, { useState } from 'react'
import './ShippingDetails.css';
import ShippingForm from '../ShippingForm/ShippingForm';

const ShippingDetails = ({userInfoPayload}) => {

  return (
    <div className='shipping-main-container'>
        <ShippingForm billingDetails={userInfoPayload} />
    </div>
  )
}

export default ShippingDetails
