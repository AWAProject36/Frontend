import React from 'react'
import styles from './ShoppingCart.module.css'

export default function ShoppingCart() {
    return (
        <div className={ styles.container }>
            <div className={ styles.ostoskori }>Ostoskori</div>
            <div className={ styles.ruokaKuva }>kuva</div>
            <div className={ styles.container2 }>
                <div className={ styles.ruokaNimi }>nimi</div>
                <div className={ styles.lisää }><button>-</button></div>
                <div className={ styles.vähennä }><button>+</button></div>
            </div>
            <div className={ styles.container2 }>
                <div className={ styles.hinta }>Hinta</div>
                <div className={ styles.hinta }></div>
            </div>
            <div className={ styles.container2 }>
                <div className={ styles.toimitusosoite }>Toimitusosoite</div>
                <div className={ styles.toimitusosoite }></div>
            </div>
            <div className={ styles.container2 }>
                <div className={ styles.postinumero }>Postinumero</div>
                <div className={ styles.postinumero }></div>
            </div>
            <div className={ styles.tilaa }><button>Tilaa</button></div>
        </div>
    )
}
