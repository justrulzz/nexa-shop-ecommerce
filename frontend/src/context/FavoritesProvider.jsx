import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState(
    localStorage.getItem("favoriteItems")
      ? JSON.parse(localStorage.getItem("favoriteItems"))
      : [],
  );

  useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const toggleFavorite = (product) => {
    const isExist = favoriteItems.find((item) => item.id === product.id);
    if (isExist) {
      setFavoriteItems(favoriteItems.filter((item) => item.id !== product.id));
    } else {
      setFavoriteItems([...favoriteItems, product]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteItems, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
