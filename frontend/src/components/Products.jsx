import { useState, useEffect } from "react";
import ProductItem from "./ProductItem.jsx";
import productsData from "../data.json";
import "./Products.css";  

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Ekran boyutuna göre gösterilecek ürün sayısını ayarlayan efekt
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 520) setSlidesToShow(1);
      else if (window.innerWidth < 992) setSlidesToShow(2);
      else setSlidesToShow(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = productsData.length - slidesToShow;
  
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // YENİ EKLENEN: Otomatik kaydırma (Autoplay) motoru
  useEffect(() => {
    // 3000 milisaniyede (3 saniyede) bir otomatik olarak bir sonraki slayta geçer
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    // Bileşen kapandığında veya maxIndex (ekran boyutu) değiştiğinde sayacı temizler
    return () => clearInterval(slideInterval);
  }, [maxIndex]); // maxIndex'i bağımlılık olarak ekledik ki ekran küçülürse hata vermesin

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <div className="glide__arrows">
            <button
              className="glide__arrow glide__arrow--left"
              onClick={prevSlide}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              onClick={nextSlide}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
          <div className="glide__track" style={{ overflow: "hidden" }}>
            <ul
              className="product-list glide__slides"
              style={{
                display: "flex",
                transition: "transform 0.5s ease-in-out",
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {productsData.map((product) => (
                <li
                  key={product.id}
                  style={{
                    flex: `0 0 ${100 / slidesToShow}%`,
                    padding: "0 15px",
                  }}
                >
                  <ProductItem productItem={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;