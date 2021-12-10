import React, { useState, useContext, useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import { UserAuthContext } from './components/Contexts';
import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import CreateRestaurant from './components/CreateRestaurant';
import Register from './components/Register';
import Restaurants from './components/Restaurants'
import jwt_decode from 'jwt-decode';
import RestaurantView from './components/RestaurantView';
import axios from 'axios';
import Orders from './components/Orders';


const jwtFromStorage = window.localStorage.getItem('appAuthData');
var userName, jwtPayload;

const App = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [registerPopup, setRegisterPopup] = useState(false);
  const [createRestaurantPopup, setcreateRestaurantPopup] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);
  const [restaurants, setRestaurants] = useState(null)
  const [searchField, setSearchField] = useState("")

  useEffect(() => {
    axios.get('https://voltti-app.herokuapp.com/restaurants')
      .then((response) => {
        setRestaurants(response.data)
      });
  }, []);

  const initialAuthData = {
    jwt: jwtFromStorage,
    login: (newValueForJwt) => {
      const newAuthData = {
        ...userAuthData,
        jwt: newValueForJwt
      };
      window.localStorage.setItem('appAuthData', newValueForJwt);
      setUserAuthData(newAuthData);
    },
    logout: () => {
      window.localStorage.removeItem('appAuthData');
      setUserAuthData({ ...initialAuthData });
      console.log("Logged out successfully")
    }
  };

  const [userAuthData, setUserAuthData] = useState({ ...initialAuthData });

  let protectedLinks = <></>

  let userInfo = <>
    <div className="loginDiv">
      <button className="button" onClick={() => setLoginPopup(true)}>Log in</button>
      <br /> OR <br />
      <button className="button" onClick={() => setRegisterPopup(true)} >Register Now</button>
    </div>
  </>

  if (userAuthData.jwt) {
    jwtPayload = jwt_decode(userAuthData.jwt);
    userName = jwtPayload.user.name;
    console.log(jwtPayload);
    userInfo = <div className="loginDiv">
      Welcome <br /> {userName} <br />
      <button className="button" onClick={() => userAuthData.logout()} >Logout</button>
    </div>
    if (jwtPayload.user.role == "user") {
      protectedLinks = <>
        <Link to='/settings'><div className="navLink">Settings</div></Link>
        <Link to='/orders'><div className="navLink">My Orders</div></Link>
        <CreateRestaurant trigger={createRestaurantPopup} setTrigger={setcreateRestaurantPopup}>
          <h3>Create a new restaurant</h3>
        </CreateRestaurant>
      </>
    }
    else {
      protectedLinks = <>
        <Link to='/settings'><div className="navLink">Settings</div></Link>
        <Link onClick={setcreateRestaurantPopup} to='/createRestaurant'> <div className="navLink">Create Restaurant</div></Link>
        <CreateRestaurant trigger={createRestaurantPopup} setTrigger={setcreateRestaurantPopup} id={jwtPayload.user.id}>
          <h3>Create a new restaurant</h3>
        </CreateRestaurant>
      </>
    }
  }
if(restaurants){
  return (
    <UserAuthContext.Provider value={userAuthData}>
      <Router>
        <div className='mainFrame'>
          <div className='navMenu'>
            <div className="infoDiv">
              {userInfo}
            </div>
            <div className="menuItemDiv">
            {protectedLinks}
            <Login trigger={loginPopup} setTrigger={setLoginPopup}><h3>Log in</h3></Login>
            <Register trigger={registerPopup} setTrigger={setRegisterPopup} loginTrigger={setLoginPopup}><h3>Register</h3></Register>
            <Link to='/shoppingcart'><div className="navLink">Shopping Cart</div></Link>
            <Link to='/restaurants'><div className="navLink">Restaurants</div></Link>
            </div>
          </div>
          <div className='content'>
            <Routes>
              <Route path="/orders" element={<Orders jwtToken = {userAuthData.jwt}/>} />
              <Route path='/restaurants' element={<Restaurants 
                restaurants={restaurants} 
                setRestaurants={setRestaurants} 
                searchField={searchField} 
                setSearchField={setSearchField}/>} />
              <Route path="/restaurants/:idrestaurant" element={<RestaurantView restaurants={restaurants}/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserAuthContext.Provider>
  )
}else{
  return(
    <div>loading</div>
  )
}
}

export default App