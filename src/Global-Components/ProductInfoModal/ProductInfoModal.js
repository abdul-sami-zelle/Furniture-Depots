import React from 'react'
import './ProductInfoModal.css'
import Image from 'next/image';
import { getAdjustedPrice } from '@/utils/api';

const ProductInfoModal = ({openModal, closeModal, salePrice, regPrice}) => {
  return (
    <div className={`info-modal-main-container ${openModal ? 'show-info-modal' : ''}`} onClick={(e) => {e.stopPropagation(); closeModal()}}>
      <div className='info-modal-inner-container' onClick={(e) => e.stopPropagation()}>
        <div className='info-modal-inner-sub-container'>
          <button className='info-modal-close-button' onClick={closeModal}>
            <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt='close' />

          </button>
          <div className='info-modal-head'>
            <h3>Enjoy Time To Pay</h3>
          </div>

          <div className='info-modal-center-body-container'>
            <h3>12 Months With Equal Payments of ${getAdjustedPrice(
              Number(salePrice && salePrice !== "" ? salePrice : regPrice)
            )}/mo.</h3>
            <h3>Based on Regular Price of ${salePrice && salePrice !== "" ? salePrice : regPrice}</h3>
          </div>

          <div className='info-modal-eligibility-check-container'>
            <button
              onClick={() => window.open('https://apply.acima.com/lease/select-location?app_id=lo&merchant_guid=merc-3bd04932-d6a0-4848-8a30-af0a9d935f25&utm_campaign=merchant&utm_source=web&lang=en', '_blank')}
            >
              Check Eligibility
            </button>

            <a target='_blank' href={'https://apply.acima.com/lease/select-location?app_id=lo&merchant_guid=merc-3bd04932-d6a0-4848-8a30-af0a9d935f25&utm_campaign=merchant&utm_source=web&lang=en'}>View  Pricing & Terms</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfoModal