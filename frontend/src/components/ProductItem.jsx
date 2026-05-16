import { useContext } from "react";
import { CartContext } from "../context/CartProvider.jsx";
import { FavoritesContext } from "../context/FavoritesProvider.jsx";
import { Link } from "react-router-dom"; // Sayfa geçişleri için Link'i ekledik
import "./ProductItem.css";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);
  const { favoriteItems, toggleFavorite } = useContext(FavoritesContext);

  // Ürün sepette mi kontrolü
  const isFilteredCart = cartItems.find(
    (cartItem) => cartItem.id === productItem.id,
  );

  // Ürün favorilerde mi kontrolü
  const isFavorite = favoriteItems.find(
    (favItem) => favItem.id === productItem.id
    
  );

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        {/* RESME TIKLAYINCA GİT */}
        <Link to={`/product/${productItem.id}`}>
          <img src={productItem.img.singleImage} alt="" className="img1" />
          <img src={productItem.img.thumbs[1]} alt="" className="img2" />
        </Link>
      </div>
      <div className="product-info">
        {/* BAŞLIĞA TIKLAYINCA GİT */}
        <Link to={`/product/${productItem.id}`} className="product-title">
          {productItem.name}
        </Link>
        <div className="product-prices">
          <strong className="new-price">
            ${productItem.price.newPrice.toFixed(2)}
          </strong>
          <span className="old-price">
            ${productItem.price.oldPrice.toFixed(2)}
          </span>
        </div>
        <span className="product-discount">-{productItem.discount}%</span>
        <div className="product-links">
          {/* Sepete Ekle Butonu */}
          <button
            className="add-to-cart"
            onClick={() => addToCart(productItem)}
            disabled={isFilteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>

          {/* Favoriye Ekle Butonu */}
          <button onClick={() => toggleFavorite(productItem)}>
            <i 
              className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`} 
              style={{ color: isFavorite ? "red" : "" }}
            ></i>
          </button>

          {/* GÖZ İKONUNA TIKLAYINCA GİT */}
          <Link to={`/product/${productItem.id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          
          <a href="#">
            <i className="bi bi-share-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;