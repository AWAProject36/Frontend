import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Restaurant from './Restaurant'
import { Link, Routes, Route } from 'react-router-dom'
import RestaurantView from './RestaurantView'

//Axios is declared at calling function instead of App.js because it otherwise fetces too fast and reports null
function Restaurants() {
  const [restaurants, setRestaurants] = useState([])
  const [searchField, setSearchField] = useState("")

  useEffect(() => {
    axios.get('https://voltti-app.herokuapp.com/restaurants')
      .then((response) => {
        console.log(response.data)
        setRestaurants(response.data)
      });
  }, []);

  const getRestaurant = (idrestaurant) => { return restaurants.find(restaurant => restaurant.idrestaurant === idrestaurant) }

  const fieldUpdate = (event) => { setSearchField(event.target.value) }

  return (
    <div className="container">
      <div className='searchDiv'>
        <p>Search</p> <input className='search' type="text" placeholder="Find Restaurants" onChange={fieldUpdate} value={searchField} />
      </div>
      <div className="restaurantList">
        {restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(searchField)).map(restaurant =>
          <Link to={`/restaurants/${restaurant.idrestaurant}`} key={restaurant.idrestaurant}>
            <Restaurant key={restaurant.idrestaurant} {...restaurant} />
          </Link>)}
      </div>
      <Routes>
        <Route path=":idrestaurant" element={<RestaurantView restaurants={restaurants} />} />
      </Routes>
    </div>
  )
}

export default Restaurants