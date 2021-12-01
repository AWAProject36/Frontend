import React, { useState, useRef } from 'react';
import FormData from 'form-data'
import styles from './CreateRestaurant.module.css'
import { uploadImage } from './Upload';

const axios = require('axios');

function CreateRestaurant(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [opening, setOpening] = useState("");
    const [closing, setClosing] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [createState, setCreateState] = useState("idle");

    const fileSelect = useRef(null);

    const createSubmit = async () => {
        let data = new FormData();
        data.append('image', image[0]);
        try {
            const result = await axios.post('https://voltti-app.herokuapp.com/restaurants', {
                name: name,
                address: address,
                opening: opening,
                closing: closing,
                img: await uploadImage(image),
                type: type,
                pricelvl: price,
                owneruserid: props.id,
            })
            setCreateState("ok");
            console.log(result)
            setTimeout(() => {
                setCreateState("idle")
                props.setTrigger(false);
            }, 3500);

        } catch (error) {
            setCreateState("err");
            console.error(error.message);
            setTimeout(() => setCreateState("idle"), 1500);
        }
    }

    let createElements = null;
    switch (createState) {
        case "idle":
            createElements = <button onClick={createSubmit}>Create</button>
            break;

        case "ok":
            createElements = <span style={{ color: 'green' }}>Restaurant has been created</span>
            break;

        case "err":
            createElements = <span style={{ color: 'red' }}>Error! Invalid fields, please try again.</span>
            break;

        default:
            createElements = <button onClick={createSubmit}>Create</button>
    }

    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popupinner}>
                <button className={styles.closebutton} onClick={() => props.setTrigger(false)}
                >close</button>
                {props.children}
                <div classname="formgroup">
                    <label htmlFor="Name"> Name:</label>
                    <input type="Name" name="Name" id="Name" onChange={(event) => setName(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Address"> Address:</label>
                    <input type="Address" name="Address" id="Address" onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Restaurant type"> Restaurant type:</label>
                    <input type="Restaurant type" name="Restaurant type" id="Restaurant type" onChange={(event) => setType(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Operating hours"> Operating hours:</label>
                    <input type="Opening hours" name="Opening hours" id="Operating hours" onChange={(event) => setOpening(event.target.value)} /> 
                    --
                    <input type="Closing hours" name="Closing hours" id="Operating hours" onChange={(event) => setClosing(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Price level"> Price level:</label>
                    <input type="Price level" name="Price level" id="Price level" onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Image"> Image:</label>
                    <input
                        ref={fileSelect}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files)}
                    />
                </div>
                {createElements}
            </div>
        </div>
    ) : "";
}

export default CreateRestaurant