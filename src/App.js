import React, { useState, useContext } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { UserAuthContext } from './components/Contexts';
import Login from './components/Login';
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'

const jwtFromStorage = window.localStorage.getItem('appAuthData');

const App = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

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
    }
  };

  const [ userAuthData, setUserAuthData ] = useState({...initialAuthData});
  return (
    <UserAuthContext.Provider value={ userAuthData }>
    <Router>
      <div className='mainFrame'>
        <div className='navMenu'>
          <div className="navLink">
          <UserAuthContext.Consumer>
            { value => (<div>Auth status: { value.jwt != null ? "Logged in": "Not logged in" }</div>) }
          </UserAuthContext.Consumer> 
          </div>
          <div className="navLink"> <button onClick={() => setButtonPopup(true)}>Log in</button> </div>
          <Link to='/settings'><div className="navLink">Settings</div></Link>
          <Link to='/orders'><div className="navLink">Orders</div></Link>
          <Link to='/shoppingcart'><div className="navLink">Shopping Cart</div></Link>
          <Link to='/restaurants'><div className="navLink">Restaurants</div></Link>
        </div>
        <div className='content'>
        <main>

      </main>
          <Login trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>Log in</h3>
          </Login>
          <Routes>
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