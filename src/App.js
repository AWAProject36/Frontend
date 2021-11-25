import Login from './components/Login';
import CreateMenu from './components/CreateMenu';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="App">
      <main>
        <button onClick={() => setButtonPopup1(true)}>Log in</button>
        <button onClick={() => setButtonPopup(true)}>Create menu</button>
      </main>
        <Login trigger={buttonPopup1} setTrigger={setButtonPopup1}>
          <h3>Log in</h3>
        </Login>
        <CreateMenu trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h2>Create menu</h2>
        </CreateMenu>
    </div>
  );
}

export default App;
