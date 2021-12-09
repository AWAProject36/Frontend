import React from 'react'

function FoodItem(props) {
    return (
        <div className='foodContainer'>
            <div className='foodImage'>
                <img src={`/images/${props.img}`} alt={props.name} />
            </div>
            <div className='foodDetails'>
                <div className='foodUpperDetaisRow'>
                    <div>{props.name}</div>
                    <div>{props.price}</div>
                </div>
                <div>{props.description}</div>
            </div>
            <div className='cartButtons'>
                {/* <button onClick={addToCart}>Add</button>
                <button onClick={removeFromCart}>Remove</button> */}
            </div>
        </div>
    )
}

export default FoodItem