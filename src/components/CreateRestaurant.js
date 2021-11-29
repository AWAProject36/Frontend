import React from 'react'
import styles from './CreateRestaurant.module.css'

function CreateRestaurant(props) {
    return (props.trigger) ? (
        <div className={ styles.popup }>
            <div className={ styles.popupinner }>
                <button className={ styles.closebutton } onClick ={() => props.setTrigger(false)}
                >close</button>
                { props.children }
                <div classname="formgroup">
                    <label htmlFor="name"> Name:</label>
                    <input type ="name" name="name" id="name"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="address"> Address:</label>
                    <input type ="address" name="address" id="address"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="opening"> Opening:</label>
                    <input type ="opening" name="opening" id="opening"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="closing"> Closing:</label>
                    <input type ="closing" name="closing" id="closing"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="img"> Image:</label>
                    <input type ="img" name="img" id="img"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="type"> Restaurant type:</label>
                    <input type ="type" name="type" id="type"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="pricelvl"> Price level:</label>
                    <input type ="pricelvl" name="pricelvl" id="pricelvl"/>
                </div>
            </div>
        </div>
    ) : "";
}

export default CreateRestaurant