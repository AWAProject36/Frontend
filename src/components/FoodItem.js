import React from 'react'
import axios from 'axios';
import styles from "./FoodItem.module.css";

function FoodItem(props) {

    const postRemoveProduct = () => {
        axios.delete(`https://voltti-app.herokuapp.com/products/${props.id}`)
            .then((response) => {
                console.log(response.data)
            });
    }
    let buttons = <></>
    if (props.jwtPayload && props.jwtPayload.user.role == "owner") {
        buttons = <>
            <button onClick={() => postRemoveProduct()}>Remove from menu</button> </>
    }
    else {
        buttons = <>
            <button onClick={() => { props.addItem(props); props.setRestaurantID(props.idrestaurant); }}>Add</button>
        </>
    }
    return (
        <div className='foodContainer'>
            <div className='foodDetails'>
            <img src={props.img} alt={props.name} />
                <div className='foodUpperDetaisRow'>
                    <div>{props.name}</div>
                    <div>{props.price}€</div>
                </div>
                <div>{props.description}</div>
            </div>
            <div className='cartButtons'>
                {buttons}
            </div>
        </div>
    )
}

export default FoodItem