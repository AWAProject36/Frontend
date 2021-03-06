import styles from './orders.module.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'


export default function Orders(props) {
    axios.defaults.headers.common = { 'Authorization': `bearer ${props.jwtToken}` }
    const [orders, setOrders] = useState(null);

    const getOrders = () => {
        axios.get('https://voltti-app.herokuapp.com/orders')
        .then((response) => {
            console.log(response.data);
            setOrders(response.data);
        });
    }
    useEffect(() => {
        getOrders();
    }, []);

    function confirmOrder(id){
        axios.put(`https://voltti-app.herokuapp.com/orders/${id}`,{
            state: "Delivered"
        })
        .then((response) => {
            console.log(response.data);
            alert("Order has been confirmed");
            getOrders();
        });
    }
    if (orders) {
        let currentOrder = [<></>];
        let i = 0;
        let found = 0;
        while(orders[i]){
        if (orders[i].state != "Delivered") {
            let eta = "";
            switch(orders[i].state) {
                case "Received":
                    eta="40 minutes";
                break;

                case "Prepairing":
                    eta="30 minutes";
                break;

                case "Ready for delivery":
                    eta="20 minutes";
                break;

                case "Delivering":
                    eta="10 minutes";
                break;
            }

            let products = [<></>];
            orders[i].products.forEach(element => {
                products.push(<p>{element}</p>)
            });
            let orderid = orders[i].id;
            currentOrder.push(
                <div className={styles.status} >
                    <p>{orders[i].restaurant}</p>
                    {products}
                    <p>Total: {orders[i].sum.toFixed(2)}€</p>
                    <p>Status: {orders[i].state}</p>
                    <p>Estimated time of arrival: {eta} </p>
                    <button className={styles.button} onClick={() => { confirmOrder(orderid) } }>Confirm Order</button>
                </div>
            );
        }
        i++;
        }
        if(found == 1){
            currentOrder = [<>
                <p> You don't have any ongoing orders</p>
                <Link to='/restaurants'><div>Order now!</div></Link>
            </>];
        }
        let orderHistory = [<></>]
        i = 0;
        while (orders[i]) {
            if(orders[i].state == "Delivered"){
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let date = new Date(orders[i].date.replace(' ', 'T'));
            orderHistory.push(
                <div className={styles.historyItem}>
                    <p>{orders[i].restaurant}, Total: {orders[i].sum.toFixed(2)}€  Order Date: {date.toLocaleDateString("en-US", options)}</p>
                </div>
            );
        }
        i++;
         }
        return (
            <div className={styles.container}>
                <div className={styles.container2}>
                    <div className={styles.tilaukset}>
                        Tilaukset
                    </div>
                    <div className={styles.historia}>
                        Tilaushistoria
                    </div>
                </div>
                <div className={styles.container2}>
                    <div className={styles.tilausStatus}>
                            {currentOrder}
                    </div>
                    <div className={styles.tilausHistoria}>
                        {orderHistory}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>loading...</div>
        )
    }
}
