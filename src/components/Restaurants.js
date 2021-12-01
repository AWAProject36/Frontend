import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Search } from './Search'
import { Outlet } from 'react-router'

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

  const fieldUpdate = (event) => { setSearchField(event.target.value) }

  return (
    <div className="container">
      <div className='searchDiv'>
        <p>Search</p> <input className='search' type="text" placeholder="Find Restaurants" onChange={fieldUpdate} value={searchField}/>
      </div>
      <div>
        <Search restaurants={restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchField))}/>
      </div>
      <div><Outlet/></div>
    </div>
  )
}

export default Restaurants