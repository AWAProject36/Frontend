import React from "react"
import { NavLink as Link} from 'react-router-dom'
import {Nav, NavMenu, NavLink, Bars} from "./Styling"

const navBar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to='/login' activeStyle>Login</NavLink>
                    <NavLink to='/settings' activeStyle>Settings</NavLink>
                    <NavLink to='/orders' activeStyle>Orders</NavLink>
                    <NavLink to='/shoppingcart' activeStyle>Shopping Cart</NavLink>
                    <NavLink to='/restaurants' activeStyle>Restaurants</NavLink>
                    <NavLink to='/Search' activeStyle>Search</NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default navBar
