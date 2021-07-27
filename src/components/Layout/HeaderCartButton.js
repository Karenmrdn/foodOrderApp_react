import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartItemsNumber = cartContext.items.reduce((sum, item) => {
    return sum + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;

  useEffect(() => {
    if (!cartContext.items.length) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <button onClick={props.onCartButtonClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
