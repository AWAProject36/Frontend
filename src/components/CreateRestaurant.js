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
                    <label htmlFor="Name"> Name:</label>
                    <input type ="Name" name="Name" id="Name"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Address"> Address:</label>
                    <input type ="Address" name="Address" id="Address"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Restaurant type"> Restaurant type:</label>
                    <input type ="Restaurant type" name="Restaurant type" id="Restaurant type"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Operating hours"> Operating hours:</label>
                    <input type ="Operating hours" name="Operating hours" id="Operating hours"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Price level"> Price level:</label>
                    <input type ="Price level" name="Price level" id="Price level"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Image"> Image:</label>
                    <input type ="Image" name="Image" id="Image"/>
                </div>
            </div>
        </div>
    ) : "";
}

export default CreateRestaurant