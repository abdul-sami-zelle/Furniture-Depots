import React, { useState, useEffect } from 'react';
import './CostumeSlider.css'; // Import the CSS file for styling
import arrowLeft from '../../../Assets/icons/arrow-left.png';
import arrowRight from '../../../Assets/icons/arrow-right.png';

const CustomSlider = ({ cards, visibleCards, showArrows = true, showDots = true, autoSlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = Math.ceil(cards.length / visibleCards);

  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(totalSlides - 1);
    }
  }, [currentIndex, totalSlides]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalSlides - 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

    useEffect(() => {
      if(autoSlide) {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval);
      }
    }, []);

  return (
    <div className="costume-slider-container">
        {showArrows && currentIndex > 0 && <button className="costume-arrow costume-left" onClick={handlePrev}>
            <img src={arrowLeft}alt='left' />
        </button>}
        {showArrows && currentIndex < totalSlides - 1 && <button className="costume-arrow costume-right" onClick={handleNext}>
            <img src={arrowRight} alt='left' />
        </button>}
      <div
        className="costume-slider-wrapper"
        style={{
          transform: `translateX(-${(currentIndex * 100) / totalSlides}%)`,
          width: `${(cards.length * 100) / visibleCards}%`,
          display: 'flex'
        }}
      >
        {cards.map((card, index) => (
          <div key={index} className="costume-slider-item">
            {card}
          </div>
        ))}
      </div>

      {showDots && (
        <div className="costume-dots-container">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`costume-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSlider;



