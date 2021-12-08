import React from 'react'

export default function Restaurant(props) {
    return (
        <div className="shop">
            <div><img src={`/images/${props.img}`} alt={props.name} className="imageSize" /></div>
            <div>
                <div className="title">{props.name}</div>
                <div className="type">{props.type}</div>
                <div className="prange">{props.pricelvl}</div>
            </div>
        </div>
    )
}