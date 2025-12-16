'use client'

import React, { useEffect, useState } from 'react'
import { url } from '../../../utils/api';

const AboutUsClient = () => {
    const [aboutusData, setAboutusData] = useState();
    const fetchAboutUs = async () => {
        const api = `/api/v1/pages/about-us/get`;
        try {
            const response = await fetch(`${url}${api}`, {
                method: 'GET',
                headers: {
                    "Content-type": 'Application/json'
                }
            });
            const result = await response.json();
            setAboutusData(result.aboutUs.content)
        } catch (error) {
            console.error("UnExpected Server Error", error);
        }
    }

    useEffect(() => {fetchAboutUs()})
  return (
    <div 
      className='shipping-and-delivery-main-container'
    >
      <div dangerouslySetInnerHTML={{ __html: aboutusData }} ></div>
    </div>
  )
}

export default AboutUsClient
