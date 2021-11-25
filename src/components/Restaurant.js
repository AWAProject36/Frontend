import React from "react";
import styles from './restaurant.module.css';
import { Link } from "react-router-dom";

export default function Restaurant(props) {
    return (
        <Link to={props.id}>
            <div className={styles.shop}>
                <div>
                    <div><img src={props.image} className={styles.imageSize} /></div>
                    <div>
                        <div className={styles.title}>{props.title}</div>
                        <div className={styles.type}>{props.type}</div>
                        <div className={styles.prange}>{props.prange}</div>
                    </div>
                </div>
            </div>
        </Link>
    )
}