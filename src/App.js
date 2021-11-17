import Login from './components/Login';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  
  return (
    <div className="App">
      <main>
        <button onClick={() => setButtonPopup(true)}>Log in</button>
      </main>
        <Login trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Log in</h3>
        </Login>
    </div>
  );
}

export default App;
