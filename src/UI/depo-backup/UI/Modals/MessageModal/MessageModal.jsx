import React from 'react'
import './MessageModal.css'
import { IoIosClose } from "react-icons/io";

const MessageModal = ({showMessage, errorDetail, title, message, footerMessage, closeModal}) => {
  return (
    <div className={`warning-modal-main-container ${showMessage ? 'show-warining-modal' : ''}`} onClick={closeModal}>
        <div className={`warning-modal-body ${showMessage ? 'show-modal-body' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className='warning-moda-head'>
                <h3>{errorDetail.title}</h3>
                <button onClick={closeModal}>
                    <IoIosClose size={25} color='var(--text-gray)' />
                </button>
            </div>
            <div className='warning-modal-message-container'>
                <p>{errorDetail.message}</p>
            </div>
            <div className='warning-modal-footer'>
                <p>Need help?  <a href="mailto:cs@thefurnituredepots.com">Contact Support</a></p>
            </div>
        </div>
    </div>
  )
}

export default MessageModal