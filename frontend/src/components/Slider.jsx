import { useState, useEffect } from "react";
import SliderItem from "./SliderItem";
import "./Slider.css";

const Sliders = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3);
  };

  // YENİ EKLENEN: Otomatik kaydırma için useEffect kullanıyoruz
  useEffect(() => {
    // Her 3000 milisaniyede (3 saniyede) bir nextSlide fonksiyonunu tetikler
    const slideInterval = setInterval(nextSlide, 3000);

    // Bileşen ekrandan kalktığında zamanlayıcıyı temizler (Performans için önemlidir)
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="slider">
      <div className="slider-elements">
        {/* State'e göre hangi resmin görüneceğini seçiyoruz */}
        {currentSlide === 0 && <SliderItem imageSrc="img/slider/slider1.jpg" />}
        {currentSlide === 1 && <SliderItem imageSrc="img/slider/slider2.jpg" />}
        {currentSlide === 2 && <SliderItem imageSrc="img/slider/slider3.jpg" />}

        <div className="slider-buttons">
          <button onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>
          <button onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <div className="slider-dots">
          <button
            className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
            onClick={() => setCurrentSlide(0)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
            onClick={() => setCurrentSlide(1)}
          >
            <span></span>
          </button>
          <button
            className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
            onClick={() => setCurrentSlide(2)}
          >
            <span></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sliders;