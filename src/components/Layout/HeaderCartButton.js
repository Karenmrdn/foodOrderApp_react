import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);

  const cartItemsNumber = cartContext.items.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  return (
    <button onClick={props.onCartButtonClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
