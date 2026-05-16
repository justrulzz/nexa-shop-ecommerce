import { useState } from "react";
import { message } from "antd";

const CartCoupon = ({ setDiscount }) => {
  // setDiscount prop olarak dışarıdan geliyor
  const [couponCode, setCouponCode] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Lütfen bir kupon kodu giriniz.");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (res.ok) {
        const data = await res.json();

        // Veritabanındaki kuponun indirim oranını al (discountPercent)
        // Eğer veritabanındaki alan ismin farklıysa (örn: discountAmount) ona göre Güncelle
        const discountRate = data.discountPercent;

        // İndirim oranını üst bileşene gönder
        setDiscount(discountRate);

        message.success(
          `Kupon başarıyla uygulandı! %${discountRate} indirim kazandınız.`,
        );
      } else {
        message.error("Kupon kodu geçersiz veya süresi dolmuş!");
      }
    } catch (error) {
      console.log("Kupon hatası:", error);
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Coupon code"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Apply Coupon
        </button>
      </div>
      <div className="update-cart">
        <button className="btn" type="button">
          Update Cart
        </button>
      </div>
    </div>
  );
};

export default CartCoupon;
