import styles from './OwnerOrders.module.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';


export default function OwnerOrders(props) {
    axios.defaults.headers.common = { 'Authorization': `bearer ${props.jwtToken}` }
    const [orders, setOrders] = useState(null);

    const getOrders = () => {
        axios.get(`https://voltti-app.herokuapp.com/orders/${props.orderRestaurantID}`)
        .then((response) => {
            console.log(response.data);
            setOrders(response.data);
        });
    }
    useEffect(() => {
        getOrders();
    }, []);

    function updateOrder(id, state){
        axios.put(`https://voltti-app.herokuapp.com/orders/${id}`,{
            state: state
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
            let products = [<></>];
            orders[i].products.forEach(element => {
                products.push(<p>{element}</p>)
            });
            let orderid = orders[i].id;
            currentOrder.push(
                <div className={styles.status} >
                    <p>Customer: {orders[i].name}</p>
                    {products}
                    <p>Phone: {orders[i].phone}</p>
                    <p>Address: {orders[i].address}</p>
                    <p>Current state: {orders[i].state}</p>
                    <div>
                    <button className={styles.button} onClick={() => { updateOrder(orderid, "Received") } }>Received</button>
                    <button className={styles.button} onClick={() => { updateOrder(orderid, "Prepairing") } }>Prepairing</button>
                    </div>
                    <div>
                    <button className={styles.button} onClick={() => { updateOrder(orderid, "Ready for delivery") } }>Ready for delivery</button>
                    <button className={styles.button} onClick={() => { updateOrder(orderid, "Delivering") } }>Delivering</button>
                    </div>
                    <button className={styles.button} onClick={() => { updateOrder(orderid, "Delivered") } }>Delivered</button>
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
                console.log("joojee");
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let date = new Date(orders[i].date.replace(' ', 'T'));
            orderHistory.push(
                <div className={styles.historyItem}>
                    <p>{orders[i].restaurant}, Total: {orders[i].sum}€  Order Date: {date.toLocaleDateString("en-US", options)}</p>
                </div>
            );
        }
        i++;
         }
        return (
            <div className={styles.container}>
                <div className={styles.container2}>
                    <div className={styles.tilaukset}>
                        Your restaurants active orders
                    </div>
                    <div className={styles.historia}>
                        Your restaurants order history
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
