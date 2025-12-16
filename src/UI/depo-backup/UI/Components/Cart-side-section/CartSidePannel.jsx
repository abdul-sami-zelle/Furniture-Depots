'use client'

import React, { useEffect, useRef, useState } from 'react'
import './CartSidePannel.css';
import CartSideSection from './CartSideSection';
import { useCart } from '../../../context/cartContext/cartContext';
import EmptyCart from '../Cart-Components/Empty-Cart/EmptyCart';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatePrice } from '@/utils/midlewares';

const CartSidePannel = (
  {
    cartData,
    addToCartClicked,
    setAddToCartClick,
    handleCartSectionClose,
    removeFromCart,
    decreamentQuantity,
    increamentQuantity,
  }) => {



  const {
    subTotal,
    isCartProtected,
    isProfessionalAssembly,
    handleCartProtected,
    handleCartAssembly,
    isCartLoading, 
    totalProtectionValue, 
    professionalAssemblyValue
  } = useCart()

  const navigate = useRouter()

  const handleCLoseCartPanel = () => {
    setAddToCartClick(false)
    navigate.push(`/cart`)

  }

  const navigateToCheckout = () => {
    setAddToCartClick(false)
    navigate.push("/check-out");
  }

  return (
    <div
      className={`cart-side-main-section ${addToCartClicked ? 'show-side-cart' : ''} `}
      onClick={handleCartSectionClose}
    >
      <button className='cart-section-close-btn' onClick={handleCartSectionClose}>
        <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt='close btn' />
      </button>
      <div
        className={`cart-side-section-containt-div ${addToCartClicked ? 'show-side-cart-containt' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className='cart-section-heading-div'>
          <div className='cart-side-section-cart-bag-div'>
            <img src={'/Assets/icons/cart-bag-new.png'} alt='cart icon' />
            {cartData && (<p className='cart-side-panel-item-count'>{(cartData?.products?.length)}</p>)}
          </div>
          <p>Your Cart </p>
        </div>

        <div className='cart-section-products'>
            {cartData?.products?.length <= 0 && <EmptyCart />}
            {cartData?.products?.map((items, index) => {
              return <CartSideSection
                key={index}
                attributes={items.attributes}
                handleItemRemove={() => removeFromCart(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                closeBtn={'/Assets/icons/close-btn.png'}
                sku={items.sku}
                productTitle={items.name}
                mainImage={items.image}
                priceTag={items.regular_price}
                decreamentQuantity={() => decreamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}
                minusBtn={'/Assets/icons/minus-white.png'}
                quantity={items.quantity}
                increamentQuantity={() => increamentQuantity(items.isVariable === 1 ? items.variation_uid : items.product_uid, items.isVariable === 1)}

                plusBtn={'/Assets/icons/plus-white.png'}
                sale_price={items.sale_price}
                regular_price={items.regular_price}
                type={items.type}
                isProtected={items.is_protected}
              />
            })}

          <div className='mobile-professional-assembly-and-protection'>

            {cartData?.products?.length > 0 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label-one'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isProfessionalAssembly}
                    onChange={() => handleCartAssembly()}
                  />
                 White Glove (+ ${totalProtectionValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Full-service delivery to your room of choice, unpacking, assembly and trash removal. Our most popular option!</p>
                
              </div>
            ) : (<></>)}

            {cartData?.products?.length > 1 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isCartProtected}
                    onChange={() => handleCartProtected()}
                  />
                  Platinum Furniture Protection(+ ${professionalAssemblyValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Our Premium Furniture Protection Plan covers accidental stains and damage to your new fabric, leather, and wood (and other hard surfaces) furniture.</p>
              </div>
            ) : (<></>)}
          </div>


        </div>

        <div className='cart-side-section-buttons'>

          <div className='desktop-protextion-and-assembily-contianer'>
            {cartData?.products?.length > 0 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label-one'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isProfessionalAssembly}
                    onChange={() => handleCartAssembly()}
                  />
                  White Glove (+ ${totalProtectionValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Full-service delivery to your room of choice, unpacking, assembly and trash removal. Our most popular option!</p>
              </div>
            ) : (<></>)}

            {cartData?.products?.length > 1 ? (
              <div className='proffesional-assembly-check-sec'>
                <label className='order-summary-proffesional-check-item-label'>
                  <input
                    type="checkbox"
                    className='order-summary-checkbox'
                    checked={isCartProtected}
                    onChange={() => handleCartProtected()}
                  />
                  Premium Platinum Furniture Protection(+ ${professionalAssemblyValue})
                </label>
                <p className='order-summary-proffesional-check-item-detail'>Our Premium Furniture Protection Plan covers accidental stains and damage to your new fabric, leather, and wood (and other hard surfaces) furniture.</p>
              </div>
            ) : (<></>)}
          </div>

          <div className='cart-side-paner-total-and-sub-total-container'>
            <p>Sub Total</p>
            <h3>{formatePrice(subTotal)}</h3>
          </div>

          <div className='cart-section-view-cart-and-checkout-btn'>
            <button className='cart-side-section-view-cart' onClick={handleCLoseCartPanel}>
              View Cart
            </button>
            <button onClick={navigateToCheckout} className='cart-side-section-checkout'>
              Checkout
            </button>
          </div>
        </div>
        {isCartLoading && <div className="loader_overlay">
          <div className="loader">

          </div>
        </div>}
      </div>
    </div>
  )
}

export default CartSidePannel