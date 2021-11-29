import React from 'react'

export default function Restaurant(props) {
    return (
        <div className="shop">
            <div>
                <div><img src={props.restaurant.img} alt="img" className="imageSize" /></div>
                <div>
                    <div className="title">{props.restaurant.name}</div>
                    <div className="type">{props.restaurant.type}</div>
                    <div className="prange">{props.restaurant.pricelvl}</div>
                </div>
            </div>
        </div>
    )
}