import React from 'react'
import { useParams } from 'react-router'

const RestaurantView = (props) => {
    const params = useParams()

    const data = props.restaurants.find(data => data.idrestaurant === parseInt(params.idrestaurant))
    console.log(data)
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
            </div>
        </div>
    )
}

export default RestaurantView
