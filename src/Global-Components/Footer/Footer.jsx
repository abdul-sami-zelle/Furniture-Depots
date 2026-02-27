'use client'

import React, {  useState } from 'react'
import './Footer.css';
import Link from 'next/link';
// Assets
import { getCurrentDay, getCurrentTimeForNewYork, url } from '../../utils/api';
import RatingReview from '../../UI/Components/starRating/starRating';
// Components
import MobileFooter from '../TabAndMobileFooter/MobileFooter';
// Functions and Utils
import axios from 'axios';
import { useGlobalContext } from '@/context/GlobalContext/globalContext';
import SnakBar from '../SnakeBar/SnakBar';
import { usePathname, useRouter } from 'next/navigation';
import { useUserDashboardContext } from '@/context/userDashboardContext/userDashboard';

const Footer = ({ notLandingPage, checkoutPage }) => {

    const router = useRouter();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { stores } = useGlobalContext()

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(''); // Reset error when the user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the default form submission

        if (!email) {
            setError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post(`${url}/api/v1/activate-scoop/add`, {
                email,
            });
            if (response.status === 201) {
                setIsSubscribed(true);
            }
            else if (response.status === 409) {
                setError('Email already exists');
            }
            else {
                setError(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            if (error.response) {
                setError(error.response.data.message || 'Something went wrong, please try again later.');
            } else {
                setError('Network error, please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const [googleRating, setGoogleRating] = useState(null);

    const socialIcons = [
        { name: 'facebook', icon: '/icons/facebook.svg', link: 'https://www.facebook.com/TheFurnitureDepots/' },
        { name: 'tiktok', icon: '/icons/tiktok.svg', link: 'https://www.tiktok.com/@thefurnituredepots.com' },
        { name: 'youtube', icon: '/icons/youtube.svg', link: 'https://www.youtube.com/@TheFurnitureDepots' },
        { name: 'insta', icon: '/icons/insta.svg', link: 'https://www.instagram.com/thefurnituredepots/' }
    ]

    const locationPhoneMail = [
        { name: stores?.[0]?.city || 'Rhode Island', icon: '/icons/location.svg', link: '#' },
        { name: '401-726-0557', icon: '/icons/phone.svg', link: 'tel:4017260557' },
        { name: 'cs@thefurnituredepots.com', icon: '/icons/mail.svg', link: '#' }
    ]

    const { setUserToken } = useUserDashboardContext();

    const handleClickOnOrders = async () => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('userToken');
            const id = localStorage.getItem('uuid');

            try {
                if (token) {
                    const response = await fetch(`${url}/api/v1/web-users/verify-token`, {
                        method: "GET",
                        headers: {
                            authorization: `${token}`,
                        },
                    });
                    if (response.ok) {
                        router.push(`/user-dashboard/${id}`);
                    }
                } else {
                    localStorage.removeItem('userToken');
                    setUserToken(null);
                    router.push('/my-account')
                }
            } catch (error) {
                console.error("Unexpected Error", error)
            }
        }
    }

    const footerCustomerCareAndAbout = [
        {
            heading: 'Customer Care', navLinks: [
                { name: 'Financing', link: '/financing' },
                { name: 'Shipping & Delivery', link: '/shipping-and-delivery' },
                { name: 'Terms & Conditions', link: '/terms-and-conditions' },
                { name: 'Return Policy', link: '/return-policy' },
                { name: 'Contact Us', link: '/contact-us' },
                
                
            ]
        },
        {
            heading: 'About Furniture Depots', navLinks: [
                { name: 'About Us', link: '/about-us' },
                { name: 'Career', link: '/careers' },
                { name: 'Store Locations', link: '/store-locator' },
                { name: 'Protection Plan', link: '/premium-bed-care' },
                { name: 'My Account', link: '/user-dashboard/:id' },
                { name: 'Blogs', link: '/blogs' },
            ]
        },
    ]

    const findDefaultStore = () => {
        const defaultStore = stores.find(store => store.postal_code === '02860')
        return defaultStore;
    }

    const defaultStore = findDefaultStore() 

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Find matching day object
    const todayTiming = stores?.[0]?.timings.find(item => item.day === today);

    const currentDay = getCurrentDay(getCurrentTimeForNewYork(), 'en-us')
    const defaultStoreTimings = defaultStore?.timings?.find(day => day.day === currentDay);

    const nearStoreDetails = [
        {
            icon: '/icons/location.svg',
            details: stores?.[0]?.name ?? defaultStore?.name
        },
        {
            icon: '/icons/phone.svg',
            details: stores?.[0]?.phone ?? defaultStore?.phone

        },
        {
            icon: '/icons/calander.svg',
            details: todayTiming?.time ?? defaultStoreTimings?.time
        },
    ]

    const handleNavigateStores = () => {
        router.push(`/store-locator`)
    }

    const [snakeBarMessage, setSnakeBarMessage] = useState('');
    const [showSnakeBar, setShowSnakeBar] = useState(false)

    const handleSnakeBarOpen = (message) => {
        setShowSnakeBar(true);
        setSnakeBarMessage(message)
    }

    const handleCloseSnakeBar = () => {
        setShowSnakeBar(false);
    }

    const handleClick = () => {
        if (defaultStore?.latitude && defaultStore?.longitude) {
            const googleMapsUrl = `https://www.google.com/maps?q=${defaultStore?.latitude},${defaultStore?.longitude}`;
            window.open(googleMapsUrl, "_blank");
        } else {
            handleSnakeBarOpen("Latitude and Longitude are not available.");
        }
    };

    const pathname = usePathname()

    return (
        <>
            <div className={`footer-main-container ${checkoutPage ? 'hide-whole-footer' : pathname === '/cart' ? 'hide-footer-on-cart' : ''}`}>
                
                <div
                    className='footer-second-contant-section'>
                    <div className='footer-left-section'>
                        <div className='left-section-contact'>
                            <div className='left-section-social-icons-div'>
                                {socialIcons.map((items, index) => (
                                    <a key={index} href={items.link} target='_blank'>
                                        <img src={items.icon} alt='icon' />
                                    </a>
                                ))}
                            </div>
                            {googleRating && <div className='footer-owner-tag'>
                                <img src={'/Assets/Logo/owner-tag.png'} alt='owner tag' />
                                <div className='owner-tag-info'>
                                    <p className='owner-tag-name'>Furniture Depots</p>

                                    <RatingReview rating={googleRating?.rating} disabled={true} bgColor={"#FFD700"} size={"20px"} />
                                    <p className='owner-tag-review'>{googleRating?.number_of_reviews} Google Reviews</p>
                                </div>
                            </div>}

                            <div className='footer-left-contact-section'>
                                {locationPhoneMail.map((item, index) => (
                                    <span key={index}>
                                        <img src={item.icon} alt='icon' />
                                        <p>{item.name === '401-726-0557' ? <a href='tel:4017260557'>{item.name}</a> : item.name === 'cs@thefurnituredepots.com' ? <a href='mailto:cs@thefurnituredepots.com'>{item.name}</a> : item.name}</p>
                                    </span>
                                ))}
                            </div>

                            <div style={{ marginTop: "30px" }} className={`footer-right-get-scoop ${notLandingPage ? '' : ''}`}>
                                <h3>Get The Scoop</h3>
                                {!isSubscribed ? <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                                    <div className='footer-get-scoop-and-conditions'>
                                        <div className='footer-get-scoop-input-search'>
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                                                <input type='text'
                                                    placeholder='Email Address'
                                                    value={email}
                                                    onChange={handleEmailChange} />
                                                {error && <p style={{ color: 'red', fontSize: "13px", margin: "10px 0 0 0 ", padding: "0", lineHeight: "10px" }}>{error}</p>}
                                            </div>
                                            {isSubmitting ? <img className='scoop_loader' src={'/Assets/Loader-animations/loader-check-two.gif'} alt="" /> : <button type='submit' disabled={isSubmitting}>
                                                Sign me up
                                            </button>}
                                        </div>
                                        <p>By signing up, you agree to our <Link href={'/privacy-policy'}> Privacy Policy </Link>  and  <Link href={'/terms-and-conditions'}>Terms of Use.</Link> </p>
                                    </div>
                                </form>
                                    :
                                    <div className="subscribtion_done_1">
                                        <img src={'/Assets/checked_white.png'} />
                                        <p className=''>Your Subscription Has Been Done Successfully.</p>
                                    </div>}
                            </div>
                        </div>

                        <div className='left-section-location-section'>
                            <h3 className='footer-location-section'>Nearest Store</h3>
                            <div className='near-store-containt-section'>
                                <div className='near-store-image-div'>

                                    {(stores?.[0]?.images?.[0]?.image_url || defaultStore?.images?.[0]?.image_url) && (
                                        <img
                                            src={`${url}${stores?.[0]?.images?.[0]?.image_url || defaultStore?.images?.[0]?.image_url
                                                }`}
                                            alt='near store'
                                        />
                                    )}
                                </div>
                                <div className='near-store-details-section'>
                                    {nearStoreDetails.map((item, index) => (
                                        <span key={index}>
                                            <img src={item.icon} alt="icon" />
                                            {item.icon === '/Assets/icons/call.png' ? (
                                                <a className='footer-near-store-tel' href={`tel:${item.details}`}>{item.details}</a>
                                            ) : (
                                                <p>{item.details}</p>
                                            )}
                                        </span>
                                    ))}
                                    <div className='appointment-and-outlet-div'>
                                        <span>
                                            <p onClick={handleNavigateStores}>Outlet</p>
                                        </span>
                                        <Link href={'#'}>
                                            <p onClick={handleClick}>Directions</p>
                                        </Link>
                                        <Link href={'/book-an-appointment'}>
                                            <p>Book an Appointment</p>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='footer-right-section'>


                        <div className='right-section-care-and-about'>
                            {footerCustomerCareAndAbout.map((item, index) => (
                                <div key={index} className='footer-costumer-care-and-about'>
                                    <h3>{item.heading}</h3>
                                    {item.navLinks.map((navItem, inn) => (
                                        navItem.name === 'My Account' ? (
                                            <p
                                                key={inn}
                                                className="about-and-care-link"
                                                onClick={handleClickOnOrders} // replace with your function
                                            >
                                                {navItem.name}
                                            </p> // Or null if you don't want anything rendered
                                        ) : navItem.name === 'Track Your Order' ? (
                                            <Link href={navItem.link} target={'_blank'} key={inn} className="about-and-care-link">
                                                {navItem.name}
                                            </Link>
                                        ) : (
                                            <Link href={navItem.link} target={navItem.name === 'Design your Room' ? '_blank' : '_self'} key={inn} className="about-and-care-link">
                                                {navItem.name}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='footer-rights-reserved-container'>
                    <p>2020 - 2026 Furniture Depots. All Rights Reserved</p>
                    <p>
                        Designed & Managed By <Link target='_blank' href={'https://zellesolutions.com/'}> Zelle Solutions</Link>
                    </p>
                </div>
            </div>
            <div className='mobile-view-footer-main-div'>
                <MobileFooter checkoutPage={checkoutPage} />
            </div>

            <SnakBar
                message={snakeBarMessage}
                openSnakeBarProp={showSnakeBar}
                setOpenSnakeBar={setShowSnakeBar}
                onClick={handleCloseSnakeBar}
            />
        </>
    )
}

export default Footer
