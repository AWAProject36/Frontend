import Login from './components/Login';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [jwtToken, setJwtToken] = useState("");
  function logToken(){
    if(jwtToken === ""){
    console.log("not logged in");
    }
    else{
    console.log(jwtToken);
    }
  }
  
  return (
    <div className="App">
      <main>
        <button onClick={() => setButtonPopup(true)}>Log in</button>
        <button onClick={ logToken }>Check token</button>
      </main>
        <Login trigger={buttonPopup} setTrigger={setButtonPopup} setJwtToken={setJwtToken}>
          <h3>Log in</h3>
        </Login>
    </div>
  );
}

export default App;
