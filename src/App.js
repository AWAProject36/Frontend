import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Restaurants from './components/Restaurants'
import searchRestaurant from './components/Search'
import Restaurant from './components/Restaurant'

const App = () => {
  return (
    <Router>
      <div className='mainFrame'>
        <div className='navMenu'>
          <Link to='/login'><div className="navLink">Login</div></Link>
          <Link to='/settings'><div className="navLink">Settings</div></Link>
          <Link to='/orders'><div className="navLink">Orders</div></Link>
          <Link to='/shoppingcart'><div className="navLink">Shopping Cart</div></Link>
          <Link to='/restaurants'><div className="navLink">Restaurants</div></Link>
          <Link to='/Search'><div className="navLink">Search</div></Link>
        </div>
        <div className='content'>
          <Routes>
            <Route path="/" element={<Restaurants />} />
            <Route path='/restaurants' element={<Restaurants />} >
              <Route path="/restaurants/idrestaurant" element={<Restaurant />} />
            </Route>
            {/* <Route path='/Search' element={<Search />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App