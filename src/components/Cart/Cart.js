import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Loader from "../../assets/svg/Loader";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://foodorder-cd34c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartContext.items,
        }),
      }
    );
    /* We also should make error check here */
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onModalClose} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button onClick={orderHandler} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const cartItems = cartContext.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));

  const cartModalContent = (
    <>
      <ul className={classes["cart-items"]}>
        {cartItems.length === 0 ? (
          <h1 style={{ textAlign: "center" }}>You have not added any items</h1>
        ) : (
          cartItems
        )}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onClose={props.onModalClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = (
    <>
      <h2>Sending order data...</h2>
      <div style={{ textAlign: "center" }}>
        <Loader />
      </div>
    </>
  );

  const didSubmitModalContent = (
    <>
      <h2>Order sent successfully!</h2>
      <div className={classes.actions}>
        <button onClick={props.onModalClose} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onModalClose={props.onModalClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
