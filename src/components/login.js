import React, { useState } from 'react'
import styles from './Login.module.css'
const axios = require('axios');


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginSubmit = async () => {
        try {
          const result = await axios.post('https://voltti-app.herokuapp.com/login', null, {
            auth: {
              username: email,
              password: password
            }
          })
          props.setJwtToken(result.data.token);
        } catch (error) {
          console.error(error.message);
        }
      }

    return (props.trigger) ? (
        <div className={ styles.popup }>
            <div className={ styles.popupinner }>
                <button className={ styles.closebutton } onClick ={() => props.setTrigger(false)}
                >close</button>
                { props.children }
                <div classname="formgroup">
                    <label htmlFor="email">Email:</label>
                    <input type ="email" name="email" id="email" onChange = { (event) =>  setEmail(event.target.value) }/>
                </div>
                <div className="formgroup">
                    <label htmlFor="password">Password:</label>
                    <input type ="password" name="password" id="password" onChange = { (event) =>  setPassword(event.target.value) }/>
                </div>
                <button onClick = { loginSubmit }
                >Login</button>
            </div>
        </div>
    ) : "";
}

export default Login
