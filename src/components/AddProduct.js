import React, { useState, useRef } from 'react';
import FormData from 'form-data'
import styles from './CreateRestaurant.module.css'
import { uploadImage } from './Upload';

const axios = require('axios');

function AddProduct(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategoryID] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [createState, setCreateState] = useState("idle");

    const fileSelect = useRef(null);

    const createSubmit = async () => {
        let data = new FormData();
        data.append('image', image[0]);
        try {
            const result = await axios.post('https://voltti-app.herokuapp.com/products', {
                name: name,
                description: description,
                img: await uploadImage(image),
                price: price,
                idcategories: category,
                idrestaurants: props.id,
            })
            setCreateState("ok");
            console.log(result)
            setTimeout(() => {
                props.getMenu();
                setCreateState("idle")
                props.setTrigger(false);
            }, 1500);

        } catch (error) {
            setCreateState("err");
            console.error(error.message);
            setTimeout(() => setCreateState("idle"), 1500);
        }
    }

    let createElements = null;
    switch (createState) {
        case "idle":
            createElements = <button onClick={createSubmit}>Add</button>
            break;

        case "ok":
            createElements = <span style={{ color: 'green' }}>A product has been added</span>
            break;

        case "err":
            createElements = <span style={{ color: 'red' }}>Error! Invalid fields, please try again.</span>
            break;

        default:
            createElements = <button onClick={createSubmit}>Add</button>
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
                    <label htmlFor="Description"> Description:</label>
                    <input type="Description" name="Description" id="Description" onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Price"> Price:</label>
                    <input type="Price" name="Price" id="Price" onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div classname="formgroup">
                    <label htmlFor="Category ID"> Category ID:</label>
                    <input type="Category ID" name="Category ID" id="CategoryID" onChange={(event) => setCategoryID(event.target.value)} />
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
                <div>{props.categoryList}</div>
                {createElements}
            </div>
        </div>
    ) : "";
}

export default AddProduct