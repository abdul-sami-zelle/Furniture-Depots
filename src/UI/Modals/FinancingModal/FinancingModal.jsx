import React from 'react'
import './FinancingModal.css';
import Link from 'next/link';
import Image from 'next/image';

const FinancingModal = ({applyFinancing, handleCloseModal}) => {

    const financingOptions = [
        {
            name: 'American First Finance',
            icon: '/Assets/icons/ammerican-financ.webp',
            link: ``
        },
        {
            name: 'Acima',
            icon: '/Assets/icons/accima.webp',
            link: ``
        },
        {
            name: 'Synchrony Financial', 
            icon: '/Assets/icons/Synchrony.png', 
            link: ''
        },
        
        {
            name: 'Progressive Leasing',
            icon: '/Assets/icons/progressive.webp',
            link: ``
        }
    ]

  return (
    <div className={`apply-for-financing-modal-main-container ${applyFinancing ? 'show-financing-modal' : ''}`} onClick={handleCloseModal}>
      <div className='financing-modal-inner-container' onClick={(e) => e.stopPropagation()}>
        <button className='financing-modal-close-btn' onClick={handleCloseModal}>
            <Image src={'/icons/close-charcoal.svg'} width={15} height={15} alt='close' />
        </button>

        <h3>Apply for Financing</h3>

        {financingOptions.map((item, index) => (
            <Link className='financing-option-button' key={index} href={item.link} target='_blank' onClick={handleCloseModal}>
                {item.icon && <Image src={item.icon} width={70} height={40} alt='icon' />}
                {item.name}
            </Link>
        ))}

      </div>
    </div>
  )
}

export default FinancingModal
