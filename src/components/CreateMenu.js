import React from 'react'
import styles from './CreateMenu.module.css'

function CreateMenu(props) {
    return (props.trigger) ? (
        <div className={ styles.popup }>
            <div className={ styles.popupinner }>
                <button className={ styles.closebutton } onClick ={() => props.setTrigger(false)}
                >close</button>
                { props.children }
                <div classname="formgroup">
                    <label htmlFor="ProductCategory">Create a product category:</label>
                    <input type ="ProductCategory" name="ProductCategory" id="ProductCategory"/>
                </div>
                <div>
                    <h4>Create a product</h4>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Name"> Name:</label>
                    <input type ="Name" name="Name" id="Name"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Price"> Price:</label>
                    <input type ="Price" name="Price" id="Price"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Category"> Category:</label>
                    <input type ="Category" name="Category" id="Category"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Description"> Description:</label>
                    <input type ="Description" name="Description" id="Description"/>
                </div>
                <div classname="formgroup">
                    <label htmlFor="Image"> Image:</label>
                    <input type ="Image" name="Image" id="Image"/>
                </div>
            </div>
        </div>
    ) : "";
}

export default CreateMenu
