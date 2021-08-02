import React from "react";
import classes from "./ValidatedCheckoutInput.module.css";

const ValidatedCheckoutInput = React.forwardRef((props, ref) => {
  const inputClasses = props.isValid
    ? classes.control
    : `${classes.control} ${classes.invalid}`;

  return (
    <div className={inputClasses}>
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} type={props.type} id={props.id} />
      {!props.isValid && <p>{props.errorMessage}</p>}
    </div>
  );
});

export default ValidatedCheckoutInput;
