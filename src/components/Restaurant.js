import React from 'react'
import { Link } from 'react-router-dom'

export default function Restaurant(props) {
    return (
        <div className="shop">
            <Link to={`/restaurants/${props.idrestaurant}`} key={props.idrestaurant}>
            <div><img src={`/images/${props.img}`} alt={props.name} className="foodImage" /></div>
            <div>
                <div className="title">{props.name}</div>
                <div className='infoRow'>
                    <div className="type">{props.type}</div>
                    <div className="prange">{props.pricelvl}</div>
                </div>
            </div>
            </Link>
        </div>
    )
}