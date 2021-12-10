import React from 'react'
import { useParams } from 'react-router'
import CategoryItem from './CategoryItem'

const RestaurantView = (props) => {
    const params = useParams()

    const data = props.restaurants.find(data => data.idrestaurant === parseInt(params.idrestaurant))

    const menuInfo = props.menu.find(menuInfo => menuInfo.idproducts === parseInt(params.idrestaurant))
    console.log(menuInfo)
    debugger

    if (data == null) {
        return <div>No data</div>
    }

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
                {menuInfo.map(menuX => 
                <CategoryItem key={menuX.categories} {...menuX} menuX={menuX}/>)}
            </div>
        </div>
    )
}

export default RestaurantView
