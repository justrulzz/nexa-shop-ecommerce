import CartProgress from "./CartProgress.jsx";
import CartTable from "./CartTable.jsx";
import CartCoupon from "./CartCoupon.jsx";
import CartTotals from "./CartTotals.jsx";
import "./Cart.css";
import { CartContext } from "../../context/CartProvider.jsx";
import { useContext, useState } from "react"; // useState ekledik

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  // İndirim oranını burada tutuyoruz
  const [discount, setDiscount] = useState(0);

  return (
    <section className="cart-page">
      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <div className="cart-form"> {/* form yerine div kullanmak daha güvenli olabilir */}
              <CartProgress />
              <div className="shop-table-wrapper">
                <CartTable />
                {/* setDiscount fonksiyonunu kupon bileşenine gönderiyoruz */}
                <CartCoupon setDiscount={setDiscount} />
              </div>
            </div>
            <div className="cart-collaterals">
              {/* discount değerini toplamlar bileşenine gönderiyoruz */}
              <CartTotals discount={discount} />
            </div>
          </div>
        ) : (
          <h2>Sepette hiç ürün yok!</h2>
        )}
      </div>
    </section>
  );
};

export default Cart;