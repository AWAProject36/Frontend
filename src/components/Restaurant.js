import React from "react";
import styles from './Restaurant.module.css';

export default function Restaurant(props) {
    return(
        <div className={styles.shop}>
            <div>
                <div><img src={props.image} className={styles.imageSize}/></div>
                <div>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.type}>{props.type}</div>
                    <div className={styles.prange}>{props.prange}</div>
                </div>
            </div>
        </div>
    )
}