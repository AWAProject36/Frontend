import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import styles from "./ShoppingCart.module.css"

export default function ShoppingCart(props) {
  const { cartItems, addItem, removeItem, setCartItems, jwtPayload } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice;
  let navigate = useNavigate();
  axios.defaults.headers.common = { 'Authorization': `bearer ${props.jwtToken}` }

  const [exp, setExp] = useState("");
  const [cNum, setCNum] = useState("");
  const [cvc, setCVC] = useState("");

  function postOrder() {
    if(exp == "" || cNum == "" || cvc == ""){
      alert("You must fill in the card details");
    } else{
    let productIdList = [];
    cartItems.map(x => {
      for (let i = 0; x.qty != i; i++) {
        productIdList.push(x.id)
      }
    }
    )
    axios.post(`https://voltti-app.herokuapp.com/orders/`, {
      idusers: jwtPayload.user.id,
      state: "New",
      products: productIdList,
      idrestaurant: props.orderRestaurantID,
    })
      .then((response) => {
        setCartItems([]);
        alert("Your order has been sent!");
        navigate("/orders", { replace: true });
      });

    }
  }

  let infoForm = <></>;
  if (cartItems) {
    infoForm = <>
      <div className={styles.FormDiv}>
        <h2>Order information: </h2>
        <form>
          <label>
            Delivery Address: <input type="text" name="address" value={jwtPayload.user.address} />
          </label>
          <h2>Card Details: </h2>
          <label>
            Card number: <input type="text" name="cardnumber" onChange={(event) => setCNum(event.target.value)}/> <br />
          </label>
          <label>
            Card expire date: <input className={styles.ExpiryInput} type="text" name="expire_month" maxLength="2" /> /
            <input className={styles.ExpiryInput} type="text" name="expire_year" maxLength="2"  onChange={(event) => setExp(event.target.value)} /> <br />
          </label>
          <label>
            CVC: <input type="text" name="expire" maxLength="3" onChange={(event) => setCVC(event.target.value)} /> <br />
          </label>
        </form>
      </div>
    </>
  }
  return (
    <aside>
      <h2 className={styles.ItemDiv}>Cart Items</h2>
      <div className={styles.MainDiv}>
        {cartItems.length === 0 && <div className={styles.ItemDiv}>Your shoppingcart is empty!
          <Link to='/restaurants'><div>Order now!</div></Link></div>}
        <div className={styles.ItemDiv}>
          {cartItems.map((item) => (
            <div key={item.id}>
              <div>{item.name}</div>
              <div>
                <button className={styles.AddRemove} onClick={() => removeItem(item)}>
                  -
                </button>{' '}
                <button className={styles.AddRemove} onClick={() => addItem(item)}>
                  +
                </button>
              </div>

              <div>
                {item.qty} x {parseFloat(item.price).toFixed(2)}???
              </div>
            </div>
          ))}

          {cartItems.length !== 0 && (
            <>
              <div>
                <hr></hr>
                <div>
                  <div>Items Price</div>
                  <div>{itemsPrice.toFixed(2)}???</div>
                </div>

                <div>
                  <div>
                    <strong>Total Price</strong>
                  </div>
                  <div>
                    <strong>{totalPrice.toFixed(2)}???</strong>
                  </div>
                </div>
                <hr />
                <div>
                  <button className={styles.button} onClick={() => postOrder()}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
        {infoForm}
      </div>
    </aside>
  );
}