import React from "react";
import mealsImage from "../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food order app</h1>
        <HeaderCartButton onCartButtonClick={props.onCartButtonClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A lot of delicious meals" />
      </div>
    </>
  );
};

export default Header;
