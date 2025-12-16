import React from "react";
import './FinanceBannerSlider.css';
import { url } from "../../../utils/api";
import Image from "next/image";
import SwiperSlider from "@/UI/Sliders/SwiperSlider/SwiperSlider";


function FinanceBannerSlider({ images, borderTop = '0px'  }) {

    return (
        <div className="carousel-container" style={{borderTop: borderTop}}>

            <SwiperSlider
                slidesData={images?.desktop}
                renderSlide={(image, index) => (
                    <div className="carousel-slide" key={index}>
                        <Image
                            src={`${url}${image.image_url}`}
                            width={1599}
                            height={146}
                            alt={`slide ${index + 1}`}
                            layout="responsive"
                        />
                    </div>
                )}
                showDots={true}
                showArrows={false}
                spaceBetween={20}
                autoplay={false}
                loop={true}
                height="150px"
                delayTime={3000}
                slidesPerView={1}
            />

        </div>
    );
}

export default FinanceBannerSlider;