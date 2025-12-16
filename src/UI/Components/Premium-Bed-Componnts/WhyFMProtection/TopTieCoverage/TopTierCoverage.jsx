import React from "react";
import './TopTierCoverage.css';
import { FaMedal } from "react-icons/fa";

const TopTierCoverage = ({icon, heading, para}) => {
    return (
        <div className="why-fm-protection-details">
                {icon}
                <h3>{heading}</h3>
                <p>
                    {para}
                </p>
            </div>
    )
}

export default TopTierCoverage;