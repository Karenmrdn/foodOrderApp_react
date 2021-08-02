import React from "react";

const Checkout = (props) => {
  const submitHandler = (e) => {
    e.preventDefault();

    console.log("Submit");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <div>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div>
        <label htmlFor="postalCode">Postal code</label>
        <input type="text" id="postalCode" />
      </div>
      <button type="submit">Confirm</button>
      <button onClick={props.onClose} type="button">
        Cancel
      </button>
    </form>
  );
};

export default Checkout;
