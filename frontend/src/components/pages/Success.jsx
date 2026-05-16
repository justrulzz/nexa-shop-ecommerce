import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";

const Success = () => {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    // 1. React'in anlık hafızasındaki sepeti boşalt
    if (typeof setCartItems === "function") {
      setCartItems([]);
    }
    
    // 2. Tarayıcının kalıcı hafızasını (localStorage) temizle! (EN ÖNEMLİ KISIM)
    // Eğer CartProvider içinde localStorage'a kaydederken başka bir isim verdiysen ("cart" gibi), burayı ona göre değiştir.
    localStorage.removeItem("cartItems"); 
    
  }, [setCartItems]);

  return (
    <div className="success-page" style={{ padding: "100px 0" }}>
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı."
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Ana Sayfa</Button>
            </Link>,
            <Link to={"/admin/orders"} key={"order"}>
              <Button>Siparişlerim</Button>,
            </Link>
          ]}
        />
      </div>
    </div>
  );
};

export default Success;