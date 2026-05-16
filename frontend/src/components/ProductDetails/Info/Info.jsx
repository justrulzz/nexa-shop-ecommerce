import { useState, useContext } from "react";
import { CartContext } from "../../../context/CartProvider";
import "./Info.css";

const Info = ({ singleProduct = {} }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cartItems } = useContext(CartContext);

  // Default değerler
  const name = singleProduct.name || "Ürün Adı";
  
  const description = singleProduct.description && singleProduct.description.length > 10
    ? singleProduct.description
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    
  const price = singleProduct.price || { oldPrice: 0, newPrice: 0 };
  const sku = singleProduct.sku || "XXXX";
  const categories = singleProduct.categories || [];
  const tags = singleProduct.tags || [];

  const isFilteredCart = cartItems.find((cartItem) => cartItem.id === singleProduct.id);

  const handleAddToCart = () => {
    const productWithSelections = {
      ...singleProduct,
      quantity: quantity,
      // Beden seçimini kaldırdığımız için artık buraya eklememize gerek yok
    };
    addToCart(productWithSelections);
  };

  return (
    <div className="product-info">
      <h1 className="product-title">{name}</h1>

      <div className="product-price">
        <span className="old-price">${price.oldPrice?.toFixed(2)}</span>
        <strong className="new-price">${price.newPrice?.toFixed(2)}</strong>
      </div>

      <div 
        className="product-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {/* BEDEN (SIZE) KISMI BURADAN KALDIRILDI */}

      <div className="product-actions">
        <div className="quantity-area">
          <button className="qty-btn" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
          <span className="qty-amount">{quantity}</span>
          <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={isFilteredCart}
          style={{ cursor: isFilteredCart ? "not-allowed" : "pointer" }}
        >
          {isFilteredCart ? "Sepette Var" : "Sepete Ekle"}
        </button>
      </div>

      <div className="product-meta-data">
        <div className="meta-line"><span>Stok Kodu:</span> {sku}</div>
        <div className="meta-line"><span>Kategoriler:</span> {categories.join(", ")}</div>
        <div className="meta-line"><span>Etiketler:</span> {tags.join(", ")}</div>
      </div>
    </div>
  );
};

export default Info;