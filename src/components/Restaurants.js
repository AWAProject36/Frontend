import React from 'react'
import Restaurant from './Restaurant'
import { Link } from 'react-router-dom'

export default function Restaurants(props) {

  const fieldUpdate = (event) => { props.setSearchField(event.target.value) }
  if (props.restaurants) {

    let restaurants = <></>;
    if (!props.jwtPayload || props.jwtPayload.user.role === "user") {
      restaurants = <>
        {props.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(props.searchField)).map(restaurant =>
          <Restaurant key={restaurant.idrestaurant} {...restaurant} />)}
      </>
    }
    else {
      restaurants = <>
        {props.restaurants.filter(restaurant => (restaurant.name.toLowerCase().includes(props.searchField)) && restaurant.owneruserid == props.jwtPayload.user.id).map(restaurant =>
          <Restaurant jwtPayload={props.jwtPayload} key={restaurant.idrestaurant} {...restaurant} />)}
      </>
    }

    return (
      <div className="viewContainer">
        <div className='searchDiv'>
          <div>Search</div> <input className='search' type="text" placeholder="Find Restaurants" onChange={fieldUpdate} value={props.searchField} />
        </div>
        <div className="restaurantList">
          {restaurants}
        </div>
      </div>
    )
  } else {
    return (
      <div>loading restaurants.js</div>
    )
  }
}