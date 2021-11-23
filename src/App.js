import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navBar';
import restaurants from './components/restaurants'
import searchRestaurant from './components/search'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/RestaurantBrowse' component={restaurants} />
        <Route path='/Search' component={searchRestaurant} />
      </Routes>
    </Router>
  );
}

export default App;
