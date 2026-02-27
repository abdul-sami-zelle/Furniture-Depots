import React from 'react'
import './LandingPageFinancing.css'
import Link from 'next/link';
import Image from 'next/image';
import { url } from '@/utils/api';
import { useRouter } from 'next/navigation';


const LandingPageFinancing = () => {
  const bannersData = [
    '/mix-images/american.jpeg',
    '/mix-images/acima.jpeg',
    '/mix-images/sync.jpeg',
    '/mix-images/progressive.jpeg',
  ]


  const router = useRouter();
  const navigateTofinancing = () => {
    router.push('/financing')
  }
  return (
    <>
      <div className='landing-page-financing-main-container'>
        <h3 className='landing-page-financing-main-heading'>Flexible Financing Options</h3>
        <div className='landing-page-financing-banners-main-container'>
          <div className='landing-page-financing-left'>

            <div onClick={navigateTofinancing}>
              <Image src={'/mix-images/american.jpeg'} width={900} height={350} alt='banner one' />
            </div>

            <div onClick={navigateTofinancing}>
              <Image src={'/mix-images/sync.jpeg'} width={900} height={350} alt='banner two' />
            </div>
          </div>
          <div className='landing-page-financing-left'>

            <div onClick={navigateTofinancing}>
              <Image src={'/mix-images/acima.jpeg'} width={900} height={350} alt='banner one' />
            </div>

            <div onClick={navigateTofinancing}>
              <Image src={'/mix-images/progressive.jpeg'} width={900} height={350} alt='banner two' />
            </div>
          </div>
          {/* <div onClick={navigateTofinancing} className='landing-page-financing-right'>
            <Image src={'/mix-images/larg-banner.jpg'} width={900} height={470} alt='banner-three' />
            <div className='financing-page-buttons-div'>
              {financingButtons.map((item, index) => (
                <div key={index} className='financing-page-buttons-div-column' onClick={(e) => e.stopPropagation()}>
                  <Link target='_blank' href={item.link} className='financing-buttons'>
                    <img src={item.img} alt={item.title} />
                  </Link>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      <div className='mobile-view-banners-container'>
        {/* {bannersData.map((item, index) => (
          <div key={index} className={index === 9 ? `hide-gif-banner-on-phone` : index === 9 ? 'combined-poster' :  `mobile-view-banner-container`}>
            <img src={item} alt='banner' className='mobile-view-banner' />
          </div>
        ))} */}
        {bannersData.map((item, index) => (
          <div key={index} className={`mobile-view-banner-container`}>
            <img src={item} alt='banner' className='mobile-view-banner' />
          </div>
        ))}
        {/* <div className='mobile-view-banner-buttons-container'>
          {financingButtons.map((item, index) => (
            <div key={index} className={`hide-paypal-section`}>
              <Link target='_blank' href={item.link} className='mobile-view-financing-buttons'>
                <img src={item.img} alt={item.title} />
              </Link>
            </div>
          ))}
        </div> */}
     

      </div>
    </>
  )
}

export default LandingPageFinancing
