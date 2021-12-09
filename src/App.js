import React, { useState, useContext } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { UserAuthContext } from './components/Contexts';
import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import CreateRestaurant from './components/CreateRestaurant';
import Register from './components/Register';
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import jwt_decode from 'jwt-decode';
import Orders from './components/Orders';

const jwtFromStorage = window.localStorage.getItem('appAuthData');
var userName, jwtPayload;

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [createRestaurantPopup, setcreateRestaurantPopup] = useState(false);
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
      setUserAuthData({...initialAuthData});
      console.log("Logged out successfully")
    }
  };

  const [ userAuthData, setUserAuthData ] = useState({...initialAuthData});

  let protectedLinks = <></>

  let userInfo = <>
  <div>
    <button onClick={() => setLoginPopup(true)}>Log in</button>
    <br /> OR <br /> 
    <button onClick={() => setRegisterPopup(true)} >Register Now</button>
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
    if(jwtPayload.user.role == "user"){
    protectedLinks = <>
    <Link to='/settings'><div className="navLink">Settings</div></Link>
    <Link to='/orders'><div className="navLink">My Orders</div></Link>
    <CreateRestaurant trigger={createRestaurantPopup} setTrigger={setcreateRestaurantPopup}>
      <h3>Create a new restaurant</h3>
    </CreateRestaurant>
    </>
    }
    else{
      protectedLinks = <>
      <Link to='/settings'><div className="navLink">Settings</div></Link>
      <Link onClick={setcreateRestaurantPopup} to='/createRestaurant'> <div className="navLink">Create Restaurant</div></Link>
      <CreateRestaurant trigger={createRestaurantPopup} setTrigger={setcreateRestaurantPopup} id = {jwtPayload.user.id}>
        <h3>Create a new restaurant</h3>
      </CreateRestaurant>
      </>
      }
  }

  return (
    <UserAuthContext.Provider value={ userAuthData }>
    <Router>
      <div className='mainFrame'>
        <div className='navMenu'>
          <div className="infoDiv">
            { userInfo }
          </div>
          { protectedLinks }
          <Link to='/shoppingcart'><div className="navLink">Shopping Cart</div></Link>
          <Link to='/restaurants'><div className="navLink">Restaurants</div></Link>
        </div>
        <div className='content'>
        <main>

      </main>
          <Login trigger={loginPopup} setTrigger={setLoginPopup}>
            <h3>Log in</h3>
          </Login>
          <Register trigger={registerPopup} setTrigger={setRegisterPopup} loginTrigger={setLoginPopup}>
            <h3>Register</h3>
          </Register>
          <Routes>
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<Restaurants />} />
              <Route path='restaurants' element={<Restaurants />} >
                <Route path=":idrestaurant" element={<Restaurant />} />
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