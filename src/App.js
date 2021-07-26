import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const showModalHandler = () => {
    setIsModalOpened(true);
  };

  const hideModalHandler = () => {
    setIsModalOpened(false);
  };

  return (
    <CartProvider>
      {isModalOpened && <Cart onModalClose={hideModalHandler} />}
      <Header onCartButtonClick={showModalHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
