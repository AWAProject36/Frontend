import { React, useEffect } from 'react'
import axios from 'axios'
import Restaurant from './Restaurant'
import { Link } from 'react-router-dom'

export default function Restaurants(props) {

  const fieldUpdate = (event) => {props.setSearchField(event.target.value) }
  if(props.restaurants){
  return (
    <div className="container">
      <div className='searchDiv'>
        <p>Search</p> <input className='search' type="text" placeholder="Find Restaurants" onChange={fieldUpdate} value={props.searchField} />
      </div>
      <div className="restaurantList">
        {props.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(props.searchField)).map(restaurant =>
          <Link to={`/restaurants/${restaurant.idrestaurant}`} key={restaurant.idrestaurant}>
            <Restaurant key={restaurant.idrestaurant} {...restaurant} />
          </Link>)}
      </div>
    </div>
  )
        }else{
          return(
            <div>loading restaurants.js</div>
          )
        }
}