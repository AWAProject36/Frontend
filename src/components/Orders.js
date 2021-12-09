import styles from './orders.module.css'
import React from 'react'

export default function Orders() {
    return (
        <div className= { styles.container }>
            <div className= { styles.container2 }>
                <div className= { styles.tilaukset }>
                Tilaukset
                </div>
                <div className= { styles.historia }>
                Tilaushistoria
                </div>
            </div>
            <div className= { styles.container2 }>
                <div className= { styles.tilausStatus }>
                    <div className= { styles.status }>
                        Status
                    </div>
                    <button>Confirm</button>
                </div>
                <div className= { styles.tilausHistoria }>
                Tilauksen historiaaa
                </div>
            </div>
        </div>
    )
}
