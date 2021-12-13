import React from 'react'
import FoodItem from './FoodItem'

function CategoryItem(props) {
    return (
        <div className='categoryItem'>
            <div className='foodCategoryName'>{props.category}</div>
            <div className='foodCategory'>
                {props.products.map(food => <FoodItem jwtPayload={props.jwtPayload}
                    setRestaurantID={props.setRestaurantID}
                    idrestaurant={props.idrestaurant}
                    addItem={props.addItem}
                    key={food.id} {...food} />)}
            </div>
        </div>
    )
}

export default CategoryItem