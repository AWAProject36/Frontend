import React from 'react'
import Restaurant from './Restaurant'
import { Link } from 'react-router-dom'

export default function Restaurants(props) {

  const fieldUpdate = (event) => {props.setSearchField(event.target.value) }
  if(props.restaurants){
  return (
    <div className="viewContainer">
      <div className='searchDiv'>
        <div>Search</div> <input className='search' type="text" placeholder="Find Restaurants" onChange={fieldUpdate} value={props.searchField} />
      </div>
      <div className="restaurantList">
        {props.restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(props.searchField)).map(restaurant =>
            <Restaurant key={restaurant.idrestaurant} {...restaurant} />)}
      </div>
    </div>
  )
        }else{
          return(
            <div>loading restaurants.js</div>
          )
        }
}