import Login from './components/Login';
import './App.css';
import React, { useState, useContext } from 'react';
import { UserAuthContext } from './components/Contexts';

const jwtFromStorage = window.localStorage.getItem('appAuthData');


function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

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
    <div className="App">
      <main>
        <button onClick={() => setButtonPopup(true)}>Log in</button>
        <UserAuthContext.Consumer>
        { value => (<div>Auth status: { value.jwt != null ? "Logged in": "Not logged in" }</div>) }
      </UserAuthContext.Consumer>
      </main>
        <Login trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Log in</h3>
        </Login>
    </div>
    </UserAuthContext.Provider>
  );
}

export default App;
