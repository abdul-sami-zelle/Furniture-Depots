import React, { useEffect, useState } from 'react'
import './OrderSummary.css'
import { useCart } from '../../../../context/cartContext/cartContext';
import { truncateTitle, url } from '../../../../utils/api';
import { useGlobalContext } from '../../../../context/GlobalContext/globalContext';
import { formatePrice } from '@/utils/midlewares';


const OrderSummary = () => {

    const {
        cartProducts,
        subTotal,
    } = useCart()

    const {
        shippingMethods,
        info,
        totalTax,
        calculateTotalTax,
        getShippingInfo,
        selectedOption,
        handleChange,
        getShippingMethods,
        selectedShippingMethods,
        setSelectedShippingMethods,
        CalculateGrandTotal
    } = useGlobalContext()
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        // Call getShippingMethods whenever subTotal or shippingMethods changes
        if (shippingMethods) {
            getShippingMethods(subTotal, shippingMethods['shippingMethods']);
            setIsStarted(!isStarted);
        }
    }, [shippingMethods, subTotal]); // Dependency array for changes in subTotal or shippingMethods

    useEffect(() => {
        if (shippingMethods) {
            getShippingMethods(subTotal, shippingMethods['shippingMethods']);
        }

    }, [isStarted])

    useEffect(() => { setSelectedShippingMethods(null) }, [info])

    return (
        <div className='order-summary-main-container'>
            <h3 className='order-summery-main-heading'>Order Summary</h3>
            <div className='mobile-view-main-heading'>
                <h3>Order Summery</h3>
                <p>Edit</p>
            </div>
            <div className='order-summary-details'>
                <div className='order-summary-selected-products-container'>
                    {cartProducts?.products?.map((items, index) => (
                        <div key={items.uid} className='selected-products'>
                            <div className='selected-single-product'>
                                <img src={`${url}${items.image.image_url}`} alt='img' />
                                <div className='selected-product-containt'>
                                    <span className='selected-product-name-and-price'>
                                        <h3>{truncateTitle(items.name, 50)}</h3>
                                        {items.sale_price === '' ? (
                                            <p>{formatePrice(items.regular_price)}</p>
                                        ) : (
                                            <div className='order-summary-prices-container' style={{ display: 'flex', flexDirection: 'column' }}>
                                                <del>{formatePrice(items.regular_price)}</del>
                                                <p>{formatePrice(items.sale_price)}</p>
                                            </div>
                                        )}

                                    </span>

                                    {items?.attributes && items?.attributes.map((item, index) => {
                                        return (
                                            <span className='selected-product-color'><p>{item?.options[0].name}</p></span>

                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='products-tax-and-total'>
                    <span>
                        <p>Sub Total: </p>
                        <p>{formatePrice(subTotal)}</p>
                    </span>
                    <span>
                        <p>{`Shipping ${selectedOption ? getShippingInfo(selectedOption)?.taxIncluded : ""}`}</p>
                        <p>{selectedOption ? getShippingInfo(selectedOption).result : ""}</p>
                    </span>
                    <span>
                        <p>{`Tax (${totalTax?.tax_name})`}</p>
                        <p>{totalTax ? formatePrice(calculateTotalTax(subTotal, parseFloat(totalTax?.tax_value))) : 0}</p>
                    </span>
                    <div className="delivery-option-container">
                        <p className='delivery-opt-heading' >Delivery Options :</p>
                        {selectedShippingMethods &&
                            selectedShippingMethods.map((option) => (
                                <label
                                    key={option.id}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        justifyContent: "flex-start",
                                        margin: "5px 0",
                                        gap: "10px",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="options"
                                        value={option.id}
                                        checked={selectedOption?.id === option.id}
                                        onChange={(e) => handleChange(e, option)} // Pass the option object
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width: "100%",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <p className="delivery-option-container-label">{option.name}</p>
                                        {option.cost === 0 ? <></> : <p className="delivery-option-container-description">{formatePrice(option.cost)}</p>}
                                        
                                    </div>
                                </label>
                            ))}
                    </div>
                </div>
                <div className='selected-product-total'>
                    <span>
                        <h3 className='selected-product-grand-total-price'>Total</h3>
                        <p className='selected-product-grand-total-price'>{formatePrice(CalculateGrandTotal())}</p>
                    </span>
                </div>
            </div>
            <div className='mobile-view-order-summery-details'>
                
                <div className='mobile-view-single-price'>
                    <p>Total</p>
                    <h3>$4900</h3>
                </div>
                <div className='mobile-view-order-summery-selected-orders'>
                    
                </div>
            </div>
        </div>
    )
}

export default OrderSummary