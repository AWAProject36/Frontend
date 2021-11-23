import React from "react";
import styles from './restaurantBrowse.module.css';

const restaurants = async () => {
    const res = await fetch('http://localhost:5000/restaurants')
    const data = await res.json()

    return data
}

export default restaurants