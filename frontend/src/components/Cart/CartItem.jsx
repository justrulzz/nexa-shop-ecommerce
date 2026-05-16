import { useContext } from "react";
import { CartContext } from "../../context/CartProvider.jsx";

const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  // GÜVENLİK ÖNLEMİ: Ürünün quantity değeri yoksa çökmemsi için varsayılan olarak 1 alıyoruz.
  const quantity = cartItem.quantity || 1; 
  // Ürünün kendi alt toplamını hesaplıyoruz (Fiyat * Adet)
  const subtotal = (cartItem.price.newPrice * quantity).toFixed(2);

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img.singleImage} alt="" />
        <i
          className="bi bi-x delete-cart"
          onClick={() => removeFromCart(cartItem.id)}
        ></i>
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price.newPrice.toFixed(2)}</td>
      <td className="product-quantity">{quantity}</td>
      <td className="product-subtotal">${subtotal}</td>
    </tr>
  );
};

export default CartItem;