import React from 'react';
import './ProductCard.css';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({
  productData,
  img,
  heading,
  productImagePrice,
}) => {

  return (
    <div className="product" >
      <div className="product-img">
        <Image
          src={img}
          width={720}
          height={450}
          alt="product"
          onDragStart={(e) => e.preventDefault()} 
        />
        <div className="product-img-detail">
          <div
            className="top_rated_head"
          >
            {/* TOP RATED */}
            Featured
          </div>
          <div className="top_rated_price_cont">
            <p>Starting From</p>
            <h3>{productImagePrice}</h3>
          </div>
        </div>
      </div>
      <div className="product-details">
        <Link
          className='product-detail-heading'
          href={{ pathname: `/product/${productData?.slug}`, state: productData }}
        >
          {heading}
        </Link>
        
      </div>
    </div>
  );
};

export default ProductCard;
