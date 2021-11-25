import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar';
import Restaurants from './components/Restaurants'
import searchRestaurant from './components/search'
import Restaurant from './components/Restaurant';
import axios from 'axios'

const App = () => {
  const [restaurant, setRestaurants] = useState([])

  useEffect(() => {
    axios.get('http://voltti-app.herokuapp.com/restaurants')
      .then((response) => {
        setRestaurants(response.data)
      });
  }, []);
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/Restaurants' element={<Restaurants restaurants={restaurants} />} >
          <Route path=":restaurantID" element={<Restaurant restaurants={restaurants} />} />
        </Route>
        <Route path='/Search' component={searchRestaurant} />
      </Routes>
    </Router>
  );

}

export default App;
