'use client'

import React from 'react';
import './BreadCrumb.css';
import Link from 'next/link';
import { FaHouseChimney } from 'react-icons/fa6';

const Breadcrumb = ({ category, productName, sku, categorySlug }) => {
    
    const pagePath = 'living/rooms';
    const basePath = pagePath?.split('/')[1]; // Extracts "product"
    const result = `/${basePath}`;

    return (
        <nav>
            <ol className={`bread-crumb-list ${result === '/product' ? 'hide-breadcrumb' : ''}`}>
               
                <li style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link href="/">
                        <FaHouseChimney style={{ height: "20px", width: "20px", marginTop: "4px" }} />
                    </Link>
                </li>
                
            </ol>
        </nav>
    );
};

export default Breadcrumb;


