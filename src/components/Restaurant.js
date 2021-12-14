import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Restaurant.module.css"

export default function Restaurant(props) {
    return (
        <div className="shop">
            <Link className={"link"} to={`/restaurants/${props.idrestaurant}`} key={props.idrestaurant}>
            <div><img src={props.img} alt={props.name} className="foodImage" /></div>
            <div>
                <div className={styles.RestaurantTitle}>{props.name}</div>
                <div className='infoRow'>
                    <div className={styles.RestaurantType}>Restaurant type: {props.type}</div>
                </div>
                <div className={styles.RestaurantPrice}> Price range: {props.pricelvl}</div>
            </div>
            </Link>
        </div>
    )
}