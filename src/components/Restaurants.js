import { React, useEffect } from 'react'
import axios from 'axios'
import Restaurant from './Restaurant'
import { Link } from 'react-router-dom'

//Axios is declared at calling function instead of App.js because it otherwise fetces too fast and reports null
function Restaurants(props) {

  useEffect((props) => {
    axios.get('https://voltti-app.herokuapp.com/restaurants')
      .then((response) => {
        console.log(response.data)
        props.setRestaurants(response.data)
      });
  }, []);

  // const getRestaurant = (idrestaurant) => { return restaurants.find(restaurant => restaurant.idrestaurant === idrestaurant) }

  const fieldUpdate = (event) => { props.setSearchField(event.target.value) }

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
}

export default Restaurants