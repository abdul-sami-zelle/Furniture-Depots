import React, { useEffect, useState } from 'react'
import './ProductStickyTabBar.css'
import {  CiLocationOn } from "react-icons/ci";
import LocationPopUp from '../../LocationPopUp/LocationPopUp';
import { useGlobalContext } from '../../../../context/GlobalContext/globalContext';
import { BsTruck } from "react-icons/bs";
import { useIsMobile } from '@/utils/isMobile';
import { formatePrice } from '@/utils/midlewares';

const ProductStickyTabBar = (
    {
        sectionRefs = {},
        isSticky,
        setIsSticky,
        productData,
        addToCart0,
        handleAddToCartProduct,
        variationData,
        isProtectionCheck,
        quantity,
        steperIndex,
        setSteperIndex,
        stockCheck,
        selectedVariationData,
    }) => {

    const isMobile = useIsMobile()
    const {isDeliveryAllowed, info} = useGlobalContext()

    const tabBarItems = [
        ...(productData?.type === 'variable'
            ? selectedVariationData?.dyrc?.active === 1
                ? ['DesignYourRoom']
                : []
            : productData?.dyrc?.active === 1
                ? ['DesignYourRoom']
                : []),
        'Description',
        'Details'
    ];

    const filteredTabItems = isMobile
        ? tabBarItems.filter(item => item !== 'DesignYourRoom')
        : tabBarItems;

    const [activeTab, setIsActiveTab] = useState('DesignYourRoom');
    const [searchLocation, setSearchLocation] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const container = document.querySelector('.product-sticky-tab-bar-main-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                if (rect.top <= 51) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }

            // Detect Active Tab Based on Scroll
            let currentTab = 'DesignYourRoom';
            tabBarItems.forEach((tab) => {
                const section = sectionRefs[tab]?.current;
                if (section) {
                    const { top } = section.getBoundingClientRect();
                    if (top <= 100) {
                        currentTab = tab;
                    }
                }
            })
            setIsActiveTab(currentTab)

            // ✅ NEW: If "Reviews" tab is reached via scrolling, scroll the tab container to the last position
            const tabContainer = document.querySelector('.product-sticky-fixed-tabs-container');
            if (tabContainer) {
                if (currentTab === 'Reviews') {
                    tabContainer.scrollLeft = tabContainer.scrollWidth; // ✅ Scroll to last tab when reaching "Reviews"
                } else if (currentTab === 'DesignYourRoom') {
                    tabContainer.scrollLeft = 0; // ✅ Scroll back to the first tab when reaching "Description"
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [sectionRefs]);

    const [locationDetails, setLocationDetails] = useState({
        zipCode: '',
        city: '',
        state: '',
        country: ''
    });

    const handleSearchModal = () => {
        setSearchLocation(true)
    }

    const handleCloseSearch = () => {
        setSearchLocation(false)
    }

    const getDeliveryDate = () => {
        const options = { weekday: "long", month: "long", day: "numeric" };
        const today = new Date();

        const optionWithTimeZone = { ...options, timeZone: "America/New_York" };

        today.setDate(today.getDate() + 5);
        return today.toLocaleDateString("en-us", optionWithTimeZone)
    }

    const handleStepperIndex = (index) => {
        setSteperIndex(index);
    }

    useEffect(() => {
        if (isMobile) {
            handleStepperIndex(0); // force show Description on mobile
        }
    }, [isMobile]);

    return (
        <>
            <div className={`product-sticky-tab-bar-main-container ${isSticky ? 'add-margin' : ''}`}>
                {isSticky && <div className={`product-sticky-fixed-container`}>
                    <div className='product-sticky-fixed-detail-and-add-to-cart'>
                        <div className='product-sticky-fixed-details'>
                            <h3>{productData?.name}</h3>
                            <span className='product-sticky-fixed-delivery-detail'>
                                <BsTruck size={20} color='var(--text-gray)' />
                                <p>Get it by</p>
                                <strong>{getDeliveryDate()}</strong>
                                <i onClick={handleSearchModal}>
                                    <CiLocationOn scale={20} />
                                    <p>{info?.locationData?.zipCode} {info?.locationData?.stateCode}</p>
                                </i>
                            </span>
                        </div>
                        <div className='product-sticky-fixed-add-to-cart'>
                            <div className='product-detail-fixed-sale-price'>
                                <p>Sale</p>
                                {productData?.sale_price !== '' ? (
                                    <span>
                                        <h3>{formatePrice(productData?.sale_price)}</h3>
                                        <p>was <del> {formatePrice(productData?.regular_price)} </del> </p>
                                    </span>
                                ) : (
                                    <h3>{formatePrice(productData?.regular_price)}</h3>
                                )}
                            </div>
                            <button
                                disabled={stockCheck || isDeliveryAllowed}
                                className={stockCheck || isDeliveryAllowed ? 'disable-sticky-add-to-cart' : ''}
                                onClick={() => {
                                    addToCart0(productData, variationData, !isProtectionCheck ? 1 : 0, quantity)
                                    handleAddToCartProduct(productData);
                                }
                                }
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>}

                <div className='product-sticky-tab-bar'>
                    {filteredTabItems.map((item, index) => (
                        <div
                            key={index}
                            className={`product-sticky-tab-bar-item-container ${steperIndex === index ? 'active-tab' : ''} ${item === 'DesignYourRoom' ? 'display-hide' : 'other-stepers'}`}
                            onClick={() => handleStepperIndex(index)}
                        >
                            <p>{item === 'DesignYourRoom' ? 'Design Your Room' : item}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Location Modal */}
            <LocationPopUp
                searchLocation={searchLocation}
                handleCloseSearch={handleCloseSearch}
                setLocationDetails={setLocationDetails}
                locationDetails={locationDetails}
            />
        </>

    )
}

export default ProductStickyTabBar