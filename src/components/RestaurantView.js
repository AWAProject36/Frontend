import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router'
import CategoryItem from './CategoryItem'
import AddProduct from './AddProduct';
import axios from 'axios';
import styles from "./RestaurantView.module.css"
import { useNavigate } from "react-router-dom";

const RestaurantView = (props) => {
    const navigate = useNavigate();
    const params = useParams()
    const [menu, setMenu] = useState(null)
    const [categories, setCategories] = useState(null)
    const [categoryName, setCategoryName] = useState("")
    const [productPopup, setProductPopup] = useState(false);

    axios.defaults.headers.common = { 'Authorization': `bearer ${props.jwtToken}` }

    const getMenu = () => {
        axios.get(`https://voltti-app.herokuapp.com/menu/${data.idrestaurant}`)
            .then((response) => {
                setMenu(response.data)
                axios.get(`https://voltti-app.herokuapp.com/categories/${data.idrestaurant}`)
                .then((response) => {
                    setCategories(response.data)
                });
            });
    }

    useEffect(() => {
        getMenu();
    }, []);


    const data = props.restaurants.find(data => data.idrestaurant === parseInt(params.idrestaurant))
    const addCategory = () => {
        try {
            if(categoryName==="") throw "emptyfield";
            const result = axios.post('https://voltti-app.herokuapp.com/categories', {
                name: categoryName,
                idrestaurant: data.idrestaurant
            })
            console.log(result);
            getMenu();
        } catch (error) {
            if(error==="emptyfield") alert("Category name cannot be empty!")
            console.error(error.message);
        }
    }
    if (data == null) {
        return <div>No data</div>
    }

    let ownerControls, categoryList = <></>
    if (props.jwtPayload && (props.jwtPayload.user.role == "owner" && categories)) {
        props.setOrderRestaurantID(data.idrestaurant);
        categoryList = categories.map(e => <>
            <div className={styles.IdList}>Category: {e.name} <br/>Category ID: {e.idcategories} </div>
            </>
            );
        ownerControls = <>
            <div className={styles.OwnerControls}>
            <button className={styles.button} onClick={() => navigate("/ownerorders", { replace: true })}> Check Orders </button>
                Restaurant owner options:
                <button className={styles.button} onClick={() => setProductPopup(true)}> Add a new product </button>
                New category:
                <input type="CategoryName" name="CategoryName" id="CategoryName" onChange={(event) => setCategoryName(event.target.value)} />
                <button className={styles.button} onClick={() => addCategory()}> Add a new category </button>
            </div>
        </>
    }

    if (menu) {
        return (
            <div className="viewContainer">
                <AddProduct getMenu = {getMenu} id={data.idrestaurant} categoryList={categoryList} trigger={productPopup} setTrigger={setProductPopup}><h3>Add a new product</h3></AddProduct>
                <div className="restaurantInfo">
                    <img src={data.img} alt={data.name} />
                    <div className="restaurantData">
                        <div>{data.name}</div>
                        <div>Address: {data.address}</div>
                        <div>Restaurant type: {data.type}</div>
                        <div>Restaurant price level:{data.pricelvl}</div>
                        <div>Restaurant opens: {data.opening}</div>
                        <div>Restaurant closes: {data.closing}</div>
                    </div>
                </div>
                {ownerControls}
                <div className="foodMenu">
                    {menu.map(menuitem =>
                        <CategoryItem
                            jwtPayload={props.jwtPayload}
                            idrestaurant={data.idrestaurant}
                            setRestaurantID={props.setRestaurantID}
                            category={menuitem.category}
                            products={menuitem.products}
                            addItem={props.addItem} />)}
                </div>
            </div>
        )
    } else {
        return (
            <div>loading</div>
        )
    }
}

export default RestaurantView
