import React from 'react'
import './FurnitureForBudget.css'
import { url } from '../../../utils/api'
import FurnitureForBudgetShimmer from './FurnitureForBudgetShimmer/FurnitureForBudgetShimmer'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const FurnitureForBudget = ({ budgetCardData }) => {
    
    const router = useRouter();

    const navigateToDetails = (uid, max_price, category) => {
        router.push(`/furniture-for-every-budget?category=${category}&categoryUid=${uid}&max_price=${max_price}`);
    }
    return (
        <div className='furniture-for-budget-main-secton'>
            <div className='furniture-for-budget-heading-section'>
                <h3>Furniture For Every Budget</h3>
            </div>
            <div className='furniture-for-budget-card'>
                {budgetCardData && budgetCardData.length > 0 ? (
                    budgetCardData && budgetCardData.map((items, index) => (
                    <div
                        key={index}
                        className={`budget-furniturre-card ${index === 1 ? 'center-card' : ''}`}
                        onClick={() => {
                            navigateToDetails(items.uid, items.max_price, items.category)
                        }}
                    >
                        <div className='budget-furniture-card-img'>
                            <Image src={url + items.img} width={640} height={400} alt='img' effect='blur' />
                        </div>
                        <div className={`budget-furniture-card-details ${index === 1 ? 'center-card-details' : ''}`}>
                            <p 
                            >{items.sale}</p>
                            
                        </div>
                    </div>
                ))
                ) : (
                    Array.from({length: 3}).map((_, index) => (
                        <FurnitureForBudgetShimmer key={index} />
                    ))
                )}
                
            </div>
        </div>
    )
}

export default FurnitureForBudget