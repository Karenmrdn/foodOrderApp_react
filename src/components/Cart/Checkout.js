import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";
import ValidatedCheckoutInput from "./ValidatedCheckoutInput";

const isEmpty = (value) => value.trim().length === 0;
const isFiveCharsLong = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    city: true,
    street: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveCharsLong(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <ValidatedCheckoutInput
        id="name"
        label="Name"
        ref={nameInputRef}
        type="text"
        isValid={formInputsValidity.name}
        errorMessage="Name must be not empty"
      />
      <ValidatedCheckoutInput
        id="city"
        label="City"
        ref={cityInputRef}
        type="text"
        isValid={formInputsValidity.city}
        errorMessage="City must be not empty"
      />
      <ValidatedCheckoutInput
        id="street"
        label="Street"
        ref={streetInputRef}
        type="text"
        isValid={formInputsValidity.street}
        errorMessage="Street must be not empty"
      />
      <ValidatedCheckoutInput
        id="postalCode"
        label="Postal Code"
        ref={postalCodeInputRef}
        type="text"
        isValid={formInputsValidity.postalCode}
        errorMessage="Postal code must consist of 5 chars"
      />
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
