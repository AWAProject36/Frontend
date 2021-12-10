import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router'
import CategoryItem from './CategoryItem'
import axios from 'axios';

const RestaurantView = (props) => {
    const params = useParams()
    const [menu, setMenu] = useState(null)


    useEffect(() => {
        console.log(data.idrestaurant)
        axios.get(`https://voltti-app.herokuapp.com/menu/${data.idrestaurant}`)
          .then((response) => {
            setMenu(response.data)
            console.log(menu)
          });
      }, []);
    
    const data = props.restaurants.find(data => data.idrestaurant === parseInt(params.idrestaurant))

    if (data == null) {
        return <div>No data</div>
    }
    if(menu){
    return (
        <div className="viewContainer">
            <div className="restaurantInfo">
                <img src={`/images/${data.img}`} alt={data.name} />
                <div className="restaurantData">
                    <div>{data.name}</div>
                    <div>{data.adress}</div>
                    <div>{data.type}</div>
                    <div>{data.pricelvl}</div>
                    <div>{data.opening}</div>
                    <div>{data.closing}</div>
                </div>
            </div>
            <div className="foodMenu">
                {menu.map(menuitem => 
                <CategoryItem category = {menuitem.category} products = {menuitem.products}/>)}
            </div>
        </div>
    )
}else{
    return(
        <div>loading</div>
    )
}
}

export default RestaurantView
