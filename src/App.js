import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import './App.css';
import { useState } from 'react';
import CreateRestaurant from './components/CreateRestaurant';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);

  return (
    <div className="App">
      <main>
        <button onClick={() => setButtonPopup2(true)}>Create Restaurant</button>
        <button onClick={() => setButtonPopup1(true)}>Log in</button>
        <button onClick={() => setButtonPopup(true)}>Create menu</button>
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
    </div>
  );
}

export default App;
