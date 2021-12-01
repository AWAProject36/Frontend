import React, { useState, useContext } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { UserAuthContext } from './components/Contexts';
import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import CreateRestaurant from './components/CreateRestaurant';
import Register from './components/Register';
import Restaurants from './components/Restaurants'
import searchRestaurant from './components/Search'
import Restaurant from './components/Restaurant'
import jwt_decode from 'jwt-decode';
import Orders from './components/Orders';

const jwtFromStorage = window.localStorage.getItem('appAuthData');
var userName, jwtPayload = "";

const App = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);

  const initialAuthData = {
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = { ...userAuthData,
          jwt: newValueForJwt
        };
      window.localStorage.setItem('appAuthData', newValueForJwt);
      setUserAuthData(newAuthData);
    },
    logout: () => {
      window.localStorage.removeItem('appAuthData');
      setUserAuthData({});
      console.log("Logged out successfully")
    }
  };

  const [ userAuthData, setUserAuthData ] = useState({...initialAuthData});

  let protectedLinks = <>
  </>

  let userInfo = <>
  <div>
    <button onClick={() => setButtonPopup(true)}>Log in</button>
  </div>
  </>

  if(userAuthData.jwt){
    jwtPayload = jwt_decode(userAuthData.jwt);
    userName = jwtPayload.user.name;
    console.log(jwtPayload);
    userInfo=<div>
              Welcome <br /> {userName} <br />
              <button onClick={() => userAuthData.logout()} >Logout</button>
             </div>
  }

  return (
    <UserAuthContext.Provider value={ userAuthData }>
    <Router>
      <div className='mainFrame'>
        <div className='navMenu'>
          <div className="infoDiv">
            { userInfo }
          </div>
          <Link to='/settings'><div className="navLink">Settings</div></Link>
          <Link to='/orders'><div className="navLink">Orders</div></Link>
          <Link to='/shoppingcart'><div className="navLink">Shopping Cart</div></Link>
          <Link to='/restaurants'><div className="navLink">Restaurants</div></Link>
          <Link to='/Search'><div className="navLink">Search</div></Link>
        </div>
        <div className='content'>
        <main>

      </main>
          <Login trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>Log in</h3>
          </Login>
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Restaurants />} />
            <Route path='/restaurants' element={<Restaurants />} >
              <Route path="/restaurants/idrestaurant" element={<Restaurant />} />
            </Route>
            {/* <Route path='/Search' element={<Search />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
    </UserAuthContext.Provider>
  )
}

export default App