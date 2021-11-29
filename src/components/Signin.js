import React from 'react'
import styles from './Signin.module.css'

function Signin(props) {
    return (props.trigger) ? (
        <div className={ styles.popup }>
            <div className={ styles.popupinner }>
                <button className={ styles.closebutton } onClick ={() => props.setTrigger(false)}
                >close</button>
                { props.children }
                <div classname="formgroup">
                    <label htmlFor="name">Name:</label>
                    <input type ="name" name="name" id="name"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="email">Email:</label>
                    <input type ="email" name="email" id="email"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="password">Password:</label>
                    <input type ="password" name="password" id="password"/>
                </div>
            </div>
        </div>
    ) : "";
}

export default Signin