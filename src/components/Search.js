import React from 'react'
import Restaurant from './Restaurant'
import { Outlet, Link } from 'react-router-dom'

export function Search(props) {

    return (
        <div className="restaurantList">
            {
                props.restaurants.map(restaurant => (<Link to={restaurant.idrestaurant}>
                    <Restaurant key={restaurant.idrestaurant} restaurant={restaurant} />
                </Link>
                ))
            }
        </div>
    )
}

export default Search