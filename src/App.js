import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import './App.css';
import { useState } from 'react';
import CreateRestaurant from './components/CreateRestaurant';
import Register from './components/Register';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);

  return (
    <div className="App">
      <main>
      </main>
    </div>
  );
}

export default App;
