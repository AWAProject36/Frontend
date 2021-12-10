import React, { useState, useContext } from 'react';
import styles from './Login.module.css'
import { UserAuthContext } from './Contexts';
const axios = require('axios');


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginState, setLoginState] = useState("idle");

    const UserAuthContextValue = useContext(UserAuthContext);

    const loginSubmit = async () => {
        try {
          const result = await axios.post('https://voltti-app.herokuapp.com/login', null, {
            auth: {
              username: email,
              password: password
            }
          })
          UserAuthContextValue.login(result.data.token);
          setLoginState("ok");
          setTimeout(() => {
            setLoginState("idle")
            UserAuthContextValue.login(result.data.token);
            props.setTrigger(false);
          }, 1500);

        } catch (error) {
          setLoginState("err");
          console.error(error.message);
          setTimeout(() => setLoginState("idle"), 1500);
        }
      }
    let loginElements = null;
    switch (loginState) {
        case "idle":
            loginElements = <button className={styles.button} onClick={loginSubmit}>Login</button>
            break;

        case "ok":
            loginElements = <span style={{ color: 'green' }}>Login successful</span>
            break;

        case "err":
            loginElements = <span style={{ color: 'red' }}>Email address or password wrong, please try again.</span>
            break;

        default:
            loginElements = <button className={styles.button} onClick={loginSubmit}>Login</button>
    }
    
    return (props.trigger) ? (
        <div className={ styles.popup }>
            <div className={ styles.popupinner }>
                <button className={ styles.closebutton } onClick ={() => props.setTrigger(false)}
                >close</button>
                { props.children }
                <div className="formgroup">
                    <label htmlFor="email">Email:</label>
                    <input type ="email" name="email" id="email" onChange = { (event) =>  setEmail(event.target.value) }/>
                </div>
                <div className="formgroup">
                    <label htmlFor="password">Password:</label>
                    <input type ="password" name="password" id="password" onChange = { (event) =>  setPassword(event.target.value) }/>
                </div>
                { loginElements }
            </div>
        </div>
    ) : "";
}

export default Login
