import React, { useEffect, useRef, useState } from 'react'
import './ShareProduct.css';
import copyCharcol from '../../../Assets/icons/copy-charcol.png'
import copySuccess from '../../../Assets/icons/copy-success.png'
import { siteUrl, url } from '../../../utils/api';
import copy from 'copy-to-clipboard';
import RatingReview from '../starRating/starRating';

import { FaFacebook, FaEnvelope, FaFacebookMessenger } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { formatePrice } from '@/utils/midlewares';

const ShareProduct = ({ isSharePopup, setIsSharePopup, selectedUid, selectedProduct }) => {

    const path = useSearchParams();
    const copyRef = useRef()
    let generatedLink = `${siteUrl}/product/${selectedProduct?.slug}`;

    const handleCloseShareProductPopup = () => {
        setIsSharePopup(null)
        setIsCpoied(false)
    }

    const socialPlatforms = [
        { name: 'Facebook', img: <FaFacebook size={30} style={{ color: 'var(--text-gray)' }} />, link: 'https://www.facebook.com/myfurnituremecca' },
        { name: 'Instagram', img: <FaFacebookMessenger size={30} style={{ color: 'var(--text-gray)' }} />, link: '#' },
        { name: 'Email', img: <FaSquareInstagram size={30} style={{ color: 'var(--text-gray)' }} />, link: 'https://www.instagram.com/myfurnituremecca/?igshid=MzRlODBiNWFlZA%3D%3D' },
        { name: 'Email', img: <RiWhatsappFill size={30} style={{ color: 'var(--text-gray)' }} />, link: '#' },
        { name: 'Email', img: <FaEnvelope size={30} style={{ color: 'var(--text-gray)' }} />, link: '#' }
    ]

    const [isCopied, setIsCpoied] = useState(false);
    const copyToClipboard = () => {
        let copyText = copyRef.current.value;
        let isCopy = copy(copyText);
        if (isCopy) {
            setIsCpoied(true);
        }
    }

    useEffect(() => {
        if (isSharePopup === selectedProduct?.uid) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [isSharePopup])


    return (
        <div className={`share-product-link-pop-up-main ${isSharePopup === selectedProduct?.uid ? 'show-product-share-pop-up' : ''}`} onClick={handleCloseShareProductPopup}>
            <div className='bg-blur-container'></div>
            <div className='share-product-link-pop-up-inner' onClick={(e) => e.stopPropagation()}>
                <button className='share-product-link-pop-up-close-btn' onClick={handleCloseShareProductPopup}>
                    <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt='close' />
                </button>

                <div className='share-product-popup-product-div'>
                    {selectedProduct?.images?.[0]?.image_url && (
                        <img
                            src={`${url}${selectedProduct.images[0].image_url}`}
                            alt='main-img'
                            className='share-product-selected-product-main-img'
                        />
                    )}

                    <div className='share-product-selected-product-details'>
                        <h3 className='shared-products-product-name'>{selectedProduct?.name}</h3>
                        <p className='shared-product-sku'>SKU: <span>{selectedProduct?.sku}</span></p>
                        <p className='shared-product-brand-name'>Brand: <span>{selectedProduct?.brand}</span></p>
                        <div className='share-product-selected-product-rating'>
                            
                            <RatingReview rating={(selectedProduct?.average_rating)} disabled={true} size={"15px"} />
                        </div>
                        {selectedProduct?.sale_price === ''
                            ? <p className='share-product-selected-product-regural-price'>{formatePrice(selectedProduct?.regular_price)}</p>
                            : <span className='share-product-selected-product-regular-and-sale-price'>
                                <del>{formatePrice(selectedProduct?.regular_price)}</del>
                                <h3>{formatePrice(selectedProduct?.sale_price)}</h3>
                            </span>}
                    </div>
                </div>
                <div className='share-product-social-platforms'>
                    {socialPlatforms.map((item, index) => (
                        <div key={index} className='share-product-single-social-platform'>
                            <Link href={item.link} target='_blank'>{item.img}</Link>
                        </div>
                    ))}
                </div>
                <div className='share-product-generated-link-main-div'>
                    <input
                        type='text'
                        value={generatedLink}
                        ref={copyRef}
                        disabled
                        className='share-product-generated-link'
                        placeholder={generatedLink}
                    />
                    <button className={`share-product-link-generator-btn ${isCopied ? 'share-products-copy-btn' : ''}`} onClick={copyToClipboard}>
                        {isCopied ? 'Copied' : 'Copy'}
                        <Image src={isCopied ? copySuccess : copyCharcol} width={24} height={24} alt='copy' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShareProduct
