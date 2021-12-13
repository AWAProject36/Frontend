import React, { useState, useContext } from 'react';
import styles from './Register.module.css'
const axios = require('axios');

function Register(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [registerState, setRegisterState] = useState("idle");

    const registerSubmit = async () => {
        try {
            if (password.length < 8) { throw "passLength" }
            const result = await axios.post('https://voltti-app.herokuapp.com/register', {
                name: name,
                address: address,
                email: email,
                password: password,
                phone: phone
            })
            console.log(result)
            if (result.data.constraint == "unique_email") {
                throw "email";
            }
            setRegisterState("ok");
            console.log(result)
            setTimeout(() => {
                setRegisterState("idle")
                props.setTrigger(false);
                props.loginTrigger(true);
            }, 1500);

        } catch (error) {
            if (error == "email") {
                setRegisterState("email");
            }
            else if (error == "passLength") {
                setRegisterState("passLength");
            }
            else{
                setRegisterState("err");
            }
            console.error(error);
            setTimeout(() => setRegisterState("idle"), 1500);
        }
    }
    let registerElements = null;
    switch (registerState) {
        case "idle":
            registerElements = <button onClick={registerSubmit}>Register</button>
            break;

        case "ok":
            registerElements = <span style={{ color: 'green' }}>Registeration successful!</span>
            break;

        case "err":
            registerElements = <span style={{ color: 'red' }}>Error! Invalid fields, make sure you filled everything and try again</span>
            break;
        case "email":
            registerElements = <span style={{ color: 'red' }}>Error! The email address is already in use.</span>
            break;
        case "passLength":
            registerElements = <span style={{ color: 'red' }}>Error! The password must be longer than 8 letters.</span>
            break;


        default:
            registerElements = <button onClick={registerSubmit}>Register</button>
    }
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupinner}>
                <button className={styles.closebutton} onClick={() => props.setTrigger(false)}
                >close</button>
                {props.children}
                <div classname="formgroup">
                    <label htmlFor="name">Name:</label>
                    <input type="name" name="name" id="name" onChange={(event) => setName(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="address">Address:</label>
                    <input type="address" name="address" id="address" onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="phone">Phone:</label>
                    <input type="phone" name="phone" id="phone" onChange={(event) => setPhone(event.target.value)} />
                </div>
                {registerElements}
            </div>
        </div>
    ) : "";
}

export default Register