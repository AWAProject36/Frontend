import React from "react"
import { Link } from 'react-router-dom'
//import { Nav, NavMenu, Link, Bars } from "./Styling"
import styles from './navBar.module.css'

const navBar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.bars} />
            <div className={styles.navMenu}>
                <Link to='/login' className={styles.navLink}>Login</Link>
                <Link to='/settings' className={styles.navLink}>Settings</Link>
                <Link to='/orders' className={styles.navLink}>Orders</Link>
                <Link to='/shoppingcart' className={styles.navLink}>Shopping Cart</Link>
                <Link to='/restaurants' className={styles.navLink}>Restaurants</Link>
                <Link to='/Search' className={styles.navLink}>Search</Link>
            </div>
        </div>
    )
}

export default navBar
