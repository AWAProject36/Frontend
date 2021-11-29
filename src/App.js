import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import './App.css';
import { useState } from 'react';
import CreateRestaurant from './components/CreateRestaurant';
import Signin from './components/Signin';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);

  return (
    <div className="App">
      <main>
      <button onClick={() => setButtonPopup(true)}>Create menu</button>
        <button onClick={() => setButtonPopup2(true)}>Create Restaurant</button>
        <button onClick={() => setButtonPopup1(true)}>Log in</button>
        <button onClick={() => setButtonPopup3(true)}>Sign in</button>
      </main>
        <Login trigger={buttonPopup1} setTrigger={setButtonPopup1}>
          <h3>Log in</h3>
        </Login>
        <CreateMenu trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h2>Create menu</h2>
        </CreateMenu>
        <CreateRestaurant trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <h3>Create a new restaurant</h3>
        </CreateRestaurant>
        <Signin trigger={buttonPopup3} setTrigger={setButtonPopup3}>
        <h3>Sign in</h3>
        </Signin>
    </div>
  );
}

export default App;
