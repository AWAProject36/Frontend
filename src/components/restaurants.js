import React from "react";
import styles from './restaurants.module.css';
import Restaurant from "./Restaurant";

const Restaurants = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.restaurantList}>
                {props.restaurants.map(restaurant =>
                    <Restaurant key={restaurant.id}{...restaurant}/>
                )}
            </div>
        </div>
    )
}

export default Restaurants