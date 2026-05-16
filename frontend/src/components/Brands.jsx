import BrandItem from "./BrandItem";
import "./Brands.css";

const Brands = () => {
  // Marka logolarının yollarını tutan veri dizimiz
  const brandData = [
    { id: 1, img: "img/brands/brand1.png" },
    { id: 2, img: "img/brands/brand2.png" },
    { id: 3, img: "img/brands/brand3.png" },
    { id: 4, img: "img/brands/brand4.png" },
    { id: 5, img: "img/brands/brand5.png" },
    // Eğer 6 tane varsa buraya ekleyebilirsin
  ];

  return (
    <section className="brands">
      <div className="container">
        <ul className="brand-list">
          {/* Döngü ile her veri için bir BrandItem oluşturuyoruz */}
          {brandData.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Brands;
