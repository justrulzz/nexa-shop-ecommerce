import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../../context/CartProvider.jsx"; // Klasör derinliğine dikkat et

const CartTable = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <table className="shop-table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {/* YENİ EKLENEN: Sepetteki ürünleri map ile listeliyoruz */}
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

export default CartTable;
