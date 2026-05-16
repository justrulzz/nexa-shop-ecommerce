import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (cartItem) => {
    setCartItems((prevCart) => [...prevCart, cartItem]);
  };

  const removeFromCart = (itemId) => {
    const filteredCart = cartItems.filter((cartItem) => cartItem.id !== itemId);
    setCartItems(filteredCart);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;