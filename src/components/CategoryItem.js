import React from 'react'
import FoodItem from './FoodItem'

function CategoryItem(props) {
    return (
        <div className='categoryItem'>
            <div className='foodCategoryName'>{props.category}</div>
            <div className='foodCategory'>
                {props.products.map(food => <FoodItem key={food.id} {...food} />)}
            </div>
        </div>
    )
}

export default CategoryItem