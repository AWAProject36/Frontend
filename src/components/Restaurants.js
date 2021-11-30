import React, { useEffect, useState } from 'react'
import Restaurant from './Restaurant'
import { Link } from 'react-router-dom'
import axios from 'axios'

//Axios is declared at calling function instead of App.js because it otherwise fetces too fast and reports null
const Restaurants = (props) => {
    const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    axios.get('https://voltti-app.herokuapp.com/restaurants')
      .then((response) => {
          console.log(response.data)
        setRestaurants(response.data)
      });
  }, []);

    return (
        <div className="container">
            <div className="restaurantList">
                {restaurants &&restaurants.length > 0 ? 
                restaurants.map((restaurant => <Link key={restaurant.idrestaurant} to={restaurant.idrestaurant}>
                    <Restaurant restaurant={restaurant} key={restaurant.idrestaurant} />
                </Link>
                )) : ""}
            </div>
        </div>
    )
}

export default Restaurants