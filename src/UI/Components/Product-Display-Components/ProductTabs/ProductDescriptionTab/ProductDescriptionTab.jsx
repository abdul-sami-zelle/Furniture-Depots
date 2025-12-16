import React, { useState } from 'react'
import './ProductDescriptionTab.css'
import { url } from '../../../../../utils/api'
import Image from 'next/image'

const ProductDescriptionTab = ({ id, descriptionRef, productData, addMarginTop ,}) => {

  return (
    <div
      id={'Description'}
      ref={descriptionRef}
      className={`product-description-main-container ${addMarginTop ? 'add-top-margin' : ''}`}
    >
      <h3>Description</h3>
      <div className='product-description-section'>
        <div className='product-description-image-container'>
          {productData?.image?.image_url && (
            <Image src={productData.outSource === true ? productData.image.image_url : `${url}${productData?.image?.image_url}`} width={320} height={160} alt='product' />
          )}
        </div>
        <div className='product-description'>
          
          <div dangerouslySetInnerHTML={{ __html: productData?.description }} ></div>
        </div>
      </div>

    </div>
  )
}

export default ProductDescriptionTab