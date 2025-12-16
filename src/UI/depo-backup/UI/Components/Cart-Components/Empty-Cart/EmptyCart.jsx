import React from 'react'
import './EmptCart.css';

const EmptyCart = () => {
  return (
    <div className='empty-cart-main-div'>
        <img src={'/Assets/icon/cart-empty.png'} alt='empty cart' />
        <h3>No Product Found</h3>
        <p>Your Cart Is <span>Empty!</span></p>
    </div>
  )
}

export default EmptyCart
