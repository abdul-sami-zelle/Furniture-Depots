import React from 'react'
import './FinancingAccount.css'

const FinancingAccount = ({topHeadng, buttonText, askQuestion, applyText}) => {
  return (
    <div className='payment-type-financing-main-container'>
      <div className='payment-type-financing-heading'>
        <h3>{topHeadng}</h3>
        <img src={'/Assets/icons/acima.png'} alt='financing card' />
      </div>
      <div className='payment-type-financing-inputs-main'>
        <button>
          {buttonText}
        </button>
      </div>
      <span className='payment-type-financing-apply'>
        {askQuestion} <p>{applyText}</p>
      </span>
    </div>
  )
}

export default FinancingAccount
