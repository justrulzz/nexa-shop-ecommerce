import { useContext, useState } from "react";
import { CartContext } from "../../context/CartProvider.jsx";

import { message, Spin } from "antd";

const CartTotals = ({ discount }) => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // 1. Alt Toplamı (Subtotal) hesapla
  const subTotals = cartItems.reduce((acc, item) => {
    return acc + item.price.newPrice * (item.quantity || 1);
  }, 0);

  const cargoFee = 15;

  // 2. İndirim miktarını hesapla
  const discountAmount = (subTotals * (discount || 0)) / 100;

  // 3. Genel Toplamı hesapla
  const cartTotals = (
    subTotals -
    discountAmount +
    (fastCargoChecked ? cargoFee : 0)
  ).toFixed(2);

  const handlePayment = async () => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }

    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başlatılamadı.");
      }

      const session = await res.json();

      // MODERN YÖNTEM: Backend'den dönen Stripe URL'sine direkt yönlendiriyoruz
      if (session.url) {
        window.location.href = session.url;
      } else {
        message.error("Stripe ödeme sayfası oluşturulamadı.");
      }
    } catch (error) {
      console.log("Ödeme hatası:", error);
      message.error("Bir bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
              </ul>
            </td>
          </tr>
          {discount > 0 && (
            <tr className="cart-discount">
              <th style={{ color: "red" }}>Discount (%{discount})</th>
              <td>
                <span style={{ color: "red" }}>
                  -${discountAmount.toFixed(2)}
                </span>
              </td>
            </tr>
          )}
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        {/* Artık Spin tanımlı olduğu için sayfa çökmeyecek */}
        <Spin spinning={loading}>
          <button className="btn btn-sm" onClick={handlePayment}>
            Proceed to checkout
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default CartTotals;